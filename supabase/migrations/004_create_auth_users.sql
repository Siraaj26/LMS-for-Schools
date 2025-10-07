-- Create proper Supabase Auth users for testing
-- Note: These users will be created in Supabase Auth, not in custom tables

-- Insert test student user into Supabase Auth
-- This should be done through the Supabase dashboard or API, but for reference:
-- Email: student@test.com
-- Password: password123
-- User metadata: { user_type: 'student', full_name: 'John Student' }

-- Insert test parent user into Supabase Auth  
-- Email: parent@test.com
-- Password: password123
-- User metadata: { user_type: 'parent', full_name: 'Jane Parent' }

-- Insert test teacher user into Supabase Auth
-- Email: teacher@test.com  
-- Password: password123
-- User metadata: { user_type: 'teacher', full_name: 'Mike Teacher' }

-- Update the custom tables to link with Supabase Auth users
-- This will be done after creating the auth users

-- Add auth_id column to link with Supabase Auth
ALTER TABLE student_login ADD COLUMN auth_id UUID REFERENCES auth.users(id);
ALTER TABLE parent_login ADD COLUMN auth_id UUID REFERENCES auth.users(id);  
ALTER TABLE admin_login ADD COLUMN auth_id UUID REFERENCES auth.users(id);

-- Update existing records to link with auth users (this will be done after creating auth users)
-- UPDATE student_login SET auth_id = (SELECT id FROM auth.users WHERE email = 'student@test.com') WHERE email = 'student@test.com';
-- UPDATE parent_login SET auth_id = (SELECT id FROM auth.users WHERE email = 'parent@test.com') WHERE email = 'parent@test.com';
-- UPDATE admin_login SET auth_id = (SELECT id FROM auth.users WHERE email = 'teacher@test.com') WHERE email = 'teacher@test.com';
