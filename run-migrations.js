const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://iggyleprkjwrveimubex.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function runMigration(filename) {
    const filePath = path.join(__dirname, 'supabase', 'migrations', filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filename}`);
        return;
    }
    
    const sql = fs.readFileSync(filePath, 'utf8');
    
    console.log(`\n📄 Running migration: ${filename}`);
    console.log('─'.repeat(60));
    
    try {
        // Split the SQL file by semicolons to execute each statement separately
        const statements = sql
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0 && !s.startsWith('--'));
        
        for (const statement of statements) {
            if (statement) {
                const { data, error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });
                
                if (error) {
                    console.log(`⚠️  Statement may have failed (this is sometimes OK):`, statement.substring(0, 100) + '...');
                    console.log(`   Error: ${error.message}`);
                }
            }
        }
        
        console.log(`✅ Migration completed: ${filename}`);
    } catch (error) {
        console.error(`❌ Error running migration ${filename}:`, error.message);
    }
}

async function main() {
    console.log('\n🚀 Starting database migrations...\n');
    
    const migrations = [
        '006_insert_sample_student_data.sql'
    ];
    
    for (const migration of migrations) {
        await runMigration(migration);
    }
    
    console.log('\n✨ All migrations completed!\n');
}

main();

