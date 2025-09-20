ALTER TABLE student_login ADD COLUMN IF NOT EXISTS current_grade TEXT;
ALTER TABLE student_login ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE student_login ADD COLUMN IF NOT EXISTS target_university TEXT;
ALTER TABLE student_login ADD COLUMN IF NOT EXISTS phone_number TEXT;
ALTER TABLE student_login ADD COLUMN IF NOT EXISTS parent_email TEXT;
ALTER TABLE student_login ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'student';
