// Script to create test users in Supabase Auth
// Run this in your browser console on the Supabase dashboard or use the Supabase client

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iggyleprkjwrveimubex.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZ3lsZXBya2p3cnZlaW11YmV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNTQyODMsImV4cCI6MjA3MzkzMDI4M30.1gHpu5GjgDsT8JLTWIwswJ2ba476xKoKdsR1LRhXDto';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUsers() {
  try {
    // Create student user
    const { data: studentData, error: studentError } = await supabase.auth.signUp({
      email: 'student@test.com',
      password: 'password123',
      options: {
        data: {
          user_type: 'student',
          full_name: 'John Student'
        }
      }
    });

    if (studentError) {
      console.error('Student creation error:', studentError);
    } else {
      console.log('✅ Student user created:', studentData);
    }

    // Create parent user
    const { data: parentData, error: parentError } = await supabase.auth.signUp({
      email: 'parent@test.com',
      password: 'password123',
      options: {
        data: {
          user_type: 'parent',
          full_name: 'Jane Parent'
        }
      }
    });

    if (parentError) {
      console.error('Parent creation error:', parentError);
    } else {
      console.log('✅ Parent user created:', parentData);
    }

    // Create teacher user
    const { data: teacherData, error: teacherError } = await supabase.auth.signUp({
      email: 'teacher@test.com',
      password: 'password123',
      options: {
        data: {
          user_type: 'teacher',
          full_name: 'Mike Teacher'
        }
      }
    });

    if (teacherError) {
      console.error('Teacher creation error:', teacherError);
    } else {
      console.log('✅ Teacher user created:', teacherData);
    }

  } catch (error) {
    console.error('Error creating test users:', error);
  }
}

// Run the function
createTestUsers();
