import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to hardcoded values
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://iggyleprkjwrveimubex.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto';

// Validate configuration
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase configuration is missing. Please check your environment variables.');
}

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Test connection on initialization
supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error('❌ Supabase connection test failed:', error);
        console.log('🔧 Please check your Supabase project status and API keys');
    } else {
        console.log('✅ Supabase client initialized successfully');
    }
});


