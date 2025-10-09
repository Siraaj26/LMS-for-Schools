-- =====================================================
-- COMPLETE DATABASE SETUP FOR LMS
-- Run this entire script in Supabase SQL Editor
-- =====================================================

-- Step 1: Create all necessary tables (if they don't exist)
-- =====================================================

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    subject TEXT NOT NULL,
    maths INTEGER,
    english INTEGER,
    science INTEGER,
    history INTEGER,
    term TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Assignments table
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    due_date DATE,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Extracurricular activities table
CREATE TABLE IF NOT EXISTS extracurricular_activities (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    activity_name TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    hours_spent INTEGER DEFAULT 0,
    last_participation DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Community events table
CREATE TABLE IF NOT EXISTS community_events (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    event_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    points_earned INTEGER DEFAULT 0,
    event_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Step 2: Clear existing sample data (optional - comment out if you want to keep existing data)
-- =====================================================

-- DELETE FROM community_events WHERE student_id IN (SELECT id FROM student_login WHERE email LIKE '%test.com');
-- DELETE FROM extracurricular_activities WHERE student_id IN (SELECT id FROM student_login WHERE email LIKE '%test.com');
-- DELETE FROM assignments WHERE student_id IN (SELECT id FROM student_login WHERE email LIKE '%test.com');
-- DELETE FROM grades WHERE student_id IN (SELECT id FROM student_login WHERE email LIKE '%test.com');

-- Step 3: Insert sample student profiles
-- =====================================================

-- Note: Update student@test.com if it already exists
INSERT INTO student_login (full_name, email, password, user_type, parent_email, phone_number, current_grade, location, target_university) 
VALUES 
    ('Stacy Johnson', 'student@test.com', 'password123', 'student', 'parent@test.com', '555-0101', 'Grade 10', 'Johannesburg', 'University of Cape Town')
ON CONFLICT (email) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    current_grade = EXCLUDED.current_grade,
    location = EXCLUDED.location,
    target_university = EXCLUDED.target_university;

-- Insert additional test students
INSERT INTO student_login (full_name, email, password, user_type, parent_email, phone_number, current_grade, location, target_university) 
VALUES 
    ('Thabo Mbeki', 'thabo@test.com', 'password123', 'student', 'thabo.parent@test.com', '555-0102', 'Grade 11', 'Pretoria', 'University of Witwatersrand'),
    ('Zanele Ndlovu', 'zanele@test.com', 'password123', 'student', 'zanele.parent@test.com', '555-0103', 'Grade 9', 'Durban', 'Stellenbosch University'),
    ('Liam Chen', 'liam@test.com', 'password123', 'student', 'liam.parent@test.com', '555-0104', 'Grade 12', 'Cape Town', 'Rhodes University'),
    ('Amara Okafor', 'amara@test.com', 'password123', 'student', 'amara.parent@test.com', '555-0105', 'Grade 10', 'Johannesburg', 'University of Pretoria')
ON CONFLICT (email) DO NOTHING;

-- Step 4: Insert grades for Stacy Johnson (student_id = 1)
-- =====================================================

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'Mathematics', 85, 78, 90, 82, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'English', 78, 88, 85, 79, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'Science', 90, 85, 92, 88, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'History', 82, 79, 88, 85, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'Geography', 88, 84, 87, 90, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'Life Orientation', 92, 90, 89, 91, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
SELECT 1, 'Afrikaans', 75, 80, 78, 76, 'Term 1'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

-- Step 5: Insert assignments for Stacy Johnson
-- =====================================================

INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
SELECT 1, 'Math Assignment Chapter 5', 'Mathematics', CURRENT_DATE + INTERVAL '3 days', 'pending', 'high'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
SELECT 1, 'English Essay - Shakespeare', 'English', CURRENT_DATE + INTERVAL '5 days', 'pending', 'medium'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
SELECT 1, 'Science Lab Report', 'Science', CURRENT_DATE + INTERVAL '7 days', 'pending', 'medium'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
SELECT 1, 'History Research Paper', 'History', CURRENT_DATE + INTERVAL '10 days', 'in_progress', 'low'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

-- Step 6: Insert extracurricular activities
-- =====================================================

INSERT INTO extracurricular_activities (student_id, activity_name, activity_type, hours_spent, last_participation) 
SELECT 1, 'Soccer Team', 'Sports', 14, CURRENT_DATE - INTERVAL '2 days'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO extracurricular_activities (student_id, activity_name, activity_type, hours_spent, last_participation) 
SELECT 1, 'Debate Club', 'Academic', 8, CURRENT_DATE - INTERVAL '5 days'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

-- Step 7: Insert community events
-- =====================================================

INSERT INTO community_events (student_id, event_name, event_type, points_earned, event_date) 
SELECT 1, 'Beach Cleanup', 'Environmental', 50, CURRENT_DATE - INTERVAL '10 days'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

INSERT INTO community_events (student_id, event_name, event_type, points_earned, event_date) 
SELECT 1, 'Food Drive', 'Charity', 70, CURRENT_DATE - INTERVAL '20 days'
WHERE EXISTS (SELECT 1 FROM student_login WHERE id = 1);

-- Step 8: Insert announcements (global for all students)
-- =====================================================

INSERT INTO announcements (title, message, priority, expires_at) 
VALUES 
    ('Midterm Exams Schedule Released', 'Check your email for the complete midterm examination timetable for all subjects.', 'high', CURRENT_DATE + INTERVAL '30 days'),
    ('School Sports Day - Oct 15', 'Annual sports day event. Sign up for your favorite events by Oct 10.', 'medium', CURRENT_DATE + INTERVAL '20 days'),
    ('University Visit Day', 'University of Cape Town representatives will be visiting next week. Book your slot now!', 'high', CURRENT_DATE + INTERVAL '14 days'),
    ('Library Extended Hours', 'Library will be open until 8 PM during exam week to support your studies.', 'normal', CURRENT_DATE + INTERVAL '45 days'),
    ('New Online Resources Available', 'Check out the new study materials and video tutorials added to your subjects.', 'normal', CURRENT_DATE + INTERVAL '60 days');

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Now you can log in as: student@test.com / password123
-- The dashboard will show real data from the database
-- =====================================================

