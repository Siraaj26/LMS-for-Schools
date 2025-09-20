const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many chat requests, please try again later.'
    }
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
    pt: "Reply in Portuguese (Português)"
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

// Chat endpoint
app.post('/api/chat', chatLimiter, async (req, res) => {
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
                error: 'Invalid language. Must be: en, es, fr, de, or pt'
            });
        }

        // Build system prompt
        const systemPrompt = buildSystemPrompt(persona, language, slang);

        // Get Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 200,
            },
        });

        // Create full prompt
        const fullPrompt = `${systemPrompt}\n\nStudent's message: "${message.trim()}"`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let reply = response.text().trim();

        // Clean up response (remove quotes if they wrap the entire response)
        if (reply.startsWith('"') && reply.endsWith('"')) {
            reply = reply.slice(1, -1);
        }

        // Ensure response isn't empty
        if (!reply) {
            reply = language === 'en'
                ? "I'm here to help! Could you tell me more about what you'd like to know?"
                : "¡Estoy aquí para ayudar! ¿Podrías contarme más sobre lo que te gustaría saber?";
        }

        // Log for monitoring (remove in production)
        console.log(`Chat request - Persona: ${persona}, Language: ${language}, Slang: ${slang}`);
        console.log(`Message length: ${message.length}, Response length: ${reply.length}`);

        res.json({ reply });

    } catch (error) {
        console.error('Chat API error:', error);

        // Handle specific Gemini API errors
        if (error.message?.includes('API key')) {
            return res.status(500).json({
                error: 'AI service configuration error. Please contact support.'
            });
        }

        if (error.message?.includes('quota')) {
            return res.status(503).json({
                error: 'AI service temporarily unavailable. Please try again later.'
            });
        }

        // Generic error response
        res.status(500).json({
            error: 'Something went wrong. Please try again in a moment.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

// Serve AskMe page
app.get('/askme', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'askme.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 AskMe! Server running on port ${PORT}`);
    console.log(`📱 Access the app at: http://localhost:${PORT}`);
    console.log(`🤖 AskMe! chatbot at: http://localhost:${PORT}/askme`);

    if (!process.env.GEMINI_API_KEY) {
        console.warn('⚠️  Warning: GEMINI_API_KEY not found in environment variables');
        console.log('   Please create a .env file with your Gemini API key');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🔄 SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🔄 SIGINT received. Shutting down gracefully...');
    process.exit(0);
});
