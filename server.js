const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI with error handling
let genAI;
try {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY environment variable is required');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized successfully');
} catch (error) {
    console.error('❌ Failed to initialize Gemini AI:', error.message);
    process.exit(1);
}

// Middleware with improved security
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : true,
    credentials: true
}));

app.use(express.json({ limit: '1mb' })); // Reduced from 10mb to prevent memory issues
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// More aggressive rate limiting to prevent API quota exhaustion
const chatLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Reduced to 10 requests per minute per IP
    message: {
        error: 'Too many chat requests. Please wait a moment before trying again.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Persona configurations
const personaPrompts = {
    mentor: {
        tone: "wise, supportive, and encouraging",
        style: "Speak like a patient teacher who believes in the student's potential"
    },
    funny: {
        tone: "cheerful, humorous, and playful",
        style: "Use light humor, puns, and playful language while staying educational"
    },
    calm: {
        tone: "peaceful, gentle, and reassuring",
        style: "Speak in a soothing, mindful way that reduces stress and anxiety"
    },
    energetic: {
        tone: "enthusiastic, motivating, and dynamic",
        style: "Use exciting language with lots of energy and motivation"
    }
};

// Language configurations
const languagePrompts = {
    en: "Reply in English",
    es: "Reply in Spanish (Español)",
    fr: "Reply in French (Français)",
    de: "Reply in German (Deutsch)",
    pt: "Reply in Portuguese (Português)",
    xh: "You MUST reply ONLY in Xhosa (isiXhosa). Do not use English or any other language in your response. Use proper Xhosa grammar, vocabulary, and sentence structure. If you don't know a specific Xhosa word, use simple Xhosa alternatives that students can understand. Your entire response must be in isiXhosa.",
    zu: "You MUST reply ONLY in Zulu (isiZulu). Do not use English or any other language in your response. Use proper Zulu grammar, vocabulary, and sentence structure. If you don't know a specific Zulu word, use simple Zulu alternatives that students can understand. Your entire response must be in isiZulu.",
    af: "You MUST reply ONLY in Afrikaans. Do not use English or any other language in your response. Use proper Afrikaans grammar, vocabulary, and sentence structure appropriate for South African students. Your entire response must be in Afrikaans."
};

// System prompt template
function buildSystemPrompt(persona, language, slang) {
    const personaConfig = personaPrompts[persona] || personaPrompts.mentor;
    const languageConfig = languagePrompts[language] || languagePrompts.en;
    const slangNote = slang ? "Use casual slang and informal expressions when appropriate." : "Use proper, formal language.";

    return `You are AskMe!, a supportive and engaging learning assistant for students.

CORE PERSONALITY:
- Always keep replies positive, concise, and engaging
- Be ${personaConfig.tone}
- ${personaConfig.style}
- ${slangNote}

LANGUAGE & COMMUNICATION:
- ${languageConfig}
- Keep responses under 150 words unless the question requires detailed explanation
- Use emojis sparingly but effectively to enhance engagement

BEHAVIOR GUIDELINES:
- Encourage progress: praise effort, give friendly nudges
- If student mentions missing deadlines: be lighthearted and supportive, not scolding
- For study help: break down complex topics into digestible parts
- For stress/anxiety: offer practical coping strategies and reassurance
- For motivation: provide specific, actionable encouragement

BOUNDARIES:
- Never give medical, legal, or harmful advice
- If question is completely off-topic from learning, politely redirect back to education
- Don't do homework FOR students, but guide them to find answers
- If you don't know something specific, admit it and suggest how they might find out

RESPONSE STYLE:
- Start with acknowledgment of their question/feeling
- Provide helpful, actionable information
- End with encouragement or a follow-up question to keep engagement going`;
}

// Chat endpoint with improved error handling and retry logic
app.post('/api/chat', chatLimiter, async (req, res) => {
    let retryCount = 0;
    const maxRetries = 2;

    const attemptChat = async () => {
        try {
            const { message, persona = 'mentor', language = 'en', slang = false } = req.body;

            // Validate input
            if (!message || typeof message !== 'string' || message.trim().length === 0) {
                return res.status(400).json({
                    error: 'Message is required and must be a non-empty string'
                });
            }

            if (message.length > 500) {
                return res.status(400).json({
                    error: 'Message too long. Please keep it under 500 characters.'
                });
            }

            // Validate persona
            if (!personaPrompts[persona]) {
                return res.status(400).json({
                    error: 'Invalid persona. Must be: mentor, funny, calm, or energetic'
                });
            }

            // Validate language
            if (!languagePrompts[language]) {
                return res.status(400).json({
                    error: 'Invalid language. Must be: en, es, fr, de, pt, xh, zu, or af'
                });
            }

            // Build system prompt
            const systemPrompt = buildSystemPrompt(persona, language, slang);

            // Get Gemini model with timeout
            const model = genAI.getGenerativeModel({
                model: "gemini-pro",
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 150, // Reduced to prevent timeouts
                },
            });

            // Create full prompt
            const fullPrompt = `${systemPrompt}\n\nStudent's message: "${message.trim()}"`;

            // Generate response with timeout
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Request timeout')), 15000); // 15 second timeout
            });

            const result = await Promise.race([
                model.generateContent(fullPrompt),
                timeoutPromise
            ]);

            const response = await result.response;
            let reply = response.text().trim();

            // Clean up response
            if (reply.startsWith('"') && reply.endsWith('"')) {
                reply = reply.slice(1, -1);
            }

            // Ensure response isn't empty
            if (!reply) {
                const fallbackMessages = {
                    en: "I'm here to help! Could you tell me more about what you'd like to know?",
                    es: "¡Estoy aquí para ayudar! ¿Podrías contarme más sobre lo que te gustaría saber?",
                    fr: "Je suis là pour vous aider! Pouvez-vous me dire plus sur ce que vous aimeriez savoir?",
                    de: "Ich bin hier, um zu helfen! Können Sie mir mehr darüber erzählen, was Sie wissen möchten?",
                    pt: "Estou aqui para ajudar! Você poderia me contar mais sobre o que gostaria de saber?",
                    xh: "Ndilapha ukunceda! Ungandixelela ngakumbi ngento ofuna ukuyazi?",
                    zu: "Ngilapha ukusiza! Ungangitshela kabanzi ngalokho ofuna ukukwazi?",
                    af: "Ek is hier om te help! Kan jy my meer vertel oor wat jy wil weet?"
                };
                reply = fallbackMessages[language] || fallbackMessages.en;
            }

            // Log for monitoring
            console.log(`✅ Chat success - Persona: ${persona}, Language: ${language}, Response: ${reply.length} chars`);

            res.json({ reply });

        } catch (error) {
            console.error(`❌ Chat attempt ${retryCount + 1} failed:`, error.message);

            // Retry logic for certain errors
            if (retryCount < maxRetries && (
                error.message?.includes('timeout') ||
                error.message?.includes('network') ||
                error.message?.includes('ECONNRESET') ||
                error.message?.includes('503')
            )) {
                retryCount++;
                console.log(`🔄 Retrying chat request (${retryCount}/${maxRetries})...`);
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
                return attemptChat();
            }

            // Handle specific errors
            if (error.message?.includes('API key')) {
                return res.status(500).json({
                    error: 'AI service configuration error. Please contact support.'
                });
            }

            if (error.message?.includes('quota') || error.message?.includes('429')) {
                return res.status(503).json({
                    error: 'AI service is busy. Please try again in a few moments.'
                });
            }

            if (error.message?.includes('timeout')) {
                return res.status(504).json({
                    error: 'Request timeout. Please try a shorter message.'
                });
            }

            // Generic error response
            res.status(500).json({
                error: 'Something went wrong. Please try again in a moment.'
            });
        }
    };

    await attemptChat();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API health check
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        message: 'Horizon AI Server - API is running',
        endpoints: {
            chat: '/chat',
            askme: '/askme',
            health: '/'
        },
        note: 'Access the Horizon app at http://localhost:3000'
    });
});

app.get('/askme', (req, res) => {
    res.json({
        status: 'online',
        message: 'AskMe! API endpoint',
        note: 'Use POST /chat to interact with the AI assistant'
    });
});

// Enhanced error handling middleware
app.use((error, req, res, next) => {
    console.error('🚨 Unhandled error:', error);

    // Don't send error details in production
    const errorResponse = process.env.NODE_ENV === 'production'
        ? { error: 'Internal server error' }
        : { error: error.message, stack: error.stack };

    res.status(500).json(errorResponse);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

// Enhanced server startup with error handling
const server = app.listen(PORT, () => {
    console.log(`🚀 AskMe! Server running on port ${PORT}`);
    console.log(`📱 Access the app at: http://localhost:${PORT}`);
    console.log(`🤖 AskMe! chatbot at: http://localhost:${PORT}/askme`);
    console.log(`🔑 API Key status: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('🚨 Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
        process.exit(1);
    }
});

// Graceful shutdown with cleanup
const gracefulShutdown = (signal) => {
    console.log(`🔄 ${signal} received. Shutting down gracefully...`);

    server.close((err) => {
        if (err) {
            console.error('❌ Error during server shutdown:', err);
            process.exit(1);
        }

        console.log('✅ Server closed successfully');
        process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        console.error('❌ Forced shutdown due to timeout');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});
