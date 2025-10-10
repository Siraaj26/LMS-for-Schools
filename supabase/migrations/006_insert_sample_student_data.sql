-- Insert sample students with diverse profiles
INSERT INTO student_login (full_name, email, password, user_type, parent_email, phone_number, current_grade, location, target_university) 
VALUES 
    ('Stacy Johnson', 'student@test.com', 'password123', 'student', 'parent@test.com', '555-0101', 'Grade 10', 'Johannesburg', 'University of Cape Town'),
    ('Thabo Mbeki', 'thabo@test.com', 'password123', 'student', 'thabo.parent@test.com', '555-0102', 'Grade 11', 'Pretoria', 'University of Witwatersrand'),
    ('Zanele Ndlovu', 'zanele@test.com', 'password123', 'student', 'zanele.parent@test.com', '555-0103', 'Grade 9', 'Durban', 'Stellenbosch University'),
    ('Liam Chen', 'liam@test.com', 'password123', 'student', 'liam.parent@test.com', '555-0104', 'Grade 12', 'Cape Town', 'Rhodes University'),
    ('Amara Okafor', 'amara@test.com', 'password123', 'student', 'amara.parent@test.com', '555-0105', 'Grade 10', 'Johannesburg', 'University of Pretoria');

-- Get student IDs for grade entries (assuming sequential IDs starting from 1)
-- Insert comprehensive grades for Stacy Johnson (student_id = 1)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (1, 'Mathematics', 85, 78, 90, 82, 'Term 1'),
    (1, 'English', 78, 88, 85, 79, 'Term 1'),
    (1, 'Science', 90, 85, 92, 88, 'Term 1'),
    (1, 'History', 82, 79, 88, 85, 'Term 1'),
    (1, 'Geography', 88, 84, 87, 90, 'Term 1'),
    (1, 'Life Orientation', 92, 90, 89, 91, 'Term 1'),
    (1, 'Afrikaans', 75, 80, 78, 76, 'Term 1');

-- Insert grades for Thabo Mbeki (student_id = 2)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (2, 'Mathematics', 92, 88, 94, 90, 'Term 1'),
    (2, 'English', 85, 90, 88, 87, 'Term 1'),
    (2, 'Physics', 95, 92, 96, 93, 'Term 1'),
    (2, 'Chemistry', 90, 89, 91, 92, 'Term 1'),
    (2, 'Computer Science', 98, 95, 97, 96, 'Term 1'),
    (2, 'Life Sciences', 88, 86, 90, 89, 'Term 1'),
    (2, 'Business Studies', 84, 85, 86, 88, 'Term 1');

-- Insert grades for Zanele Ndlovu (student_id = 3)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (3, 'Mathematics', 78, 82, 80, 85, 'Term 1'),
    (3, 'English', 92, 95, 93, 94, 'Term 1'),
    (3, 'History', 88, 90, 87, 89, 'Term 1'),
    (3, 'Geography', 85, 88, 86, 87, 'Term 1'),
    (3, 'Life Sciences', 80, 83, 82, 84, 'Term 1'),
    (3, 'Art & Design', 95, 96, 94, 97, 'Term 1');

-- Insert grades for Liam Chen (student_id = 4)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (4, 'Mathematics', 96, 94, 97, 95, 'Term 1'),
    (4, 'English', 88, 90, 89, 91, 'Term 1'),
    (4, 'Physics', 98, 97, 99, 98, 'Term 1'),
    (4, 'Chemistry', 95, 93, 96, 94, 'Term 1'),
    (4, 'Further Mathematics', 94, 92, 95, 93, 'Term 1'),
    (4, 'Computer Science', 97, 96, 98, 97, 'Term 1'),
    (4, 'Economics', 90, 89, 91, 92, 'Term 1');

-- Insert grades for Amara Okafor (student_id = 5)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (5, 'Mathematics', 82, 85, 84, 86, 'Term 1'),
    (5, 'English', 90, 92, 91, 93, 'Term 1'),
    (5, 'Life Sciences', 88, 87, 89, 90, 'Term 1'),
    (5, 'History', 85, 86, 87, 88, 'Term 1'),
    (5, 'Drama', 95, 94, 96, 97, 'Term 1'),
    (5, 'Music', 92, 91, 93, 94, 'Term 1');

-- Create assignments table
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

-- Insert sample assignments for Stacy Johnson
INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
VALUES 
    (1, 'Math Assignment Chapter 5', 'Mathematics', CURRENT_DATE + INTERVAL '3 days', 'pending', 'high'),
    (1, 'English Essay - Shakespeare', 'English', CURRENT_DATE + INTERVAL '5 days', 'pending', 'medium'),
    (1, 'Science Lab Report', 'Science', CURRENT_DATE + INTERVAL '7 days', 'pending', 'medium'),
    (1, 'History Research Paper', 'History', CURRENT_DATE + INTERVAL '10 days', 'in_progress', 'low');

-- Insert sample assignments for Thabo Mbeki
INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
VALUES 
    (2, 'Physics Problem Set 3', 'Physics', CURRENT_DATE + INTERVAL '2 days', 'pending', 'high'),
    (2, 'Computer Science Project', 'Computer Science', CURRENT_DATE + INTERVAL '14 days', 'in_progress', 'high'),
    (2, 'Chemistry Practical Report', 'Chemistry', CURRENT_DATE + INTERVAL '4 days', 'pending', 'medium');

-- Insert sample assignments for Zanele Ndlovu
INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
VALUES 
    (3, 'English Creative Writing', 'English', CURRENT_DATE + INTERVAL '6 days', 'pending', 'medium'),
    (3, 'Art Portfolio Submission', 'Art & Design', CURRENT_DATE + INTERVAL '20 days', 'in_progress', 'high'),
    (3, 'History Timeline Project', 'History', CURRENT_DATE + INTERVAL '8 days', 'pending', 'low');

-- Insert sample assignments for Liam Chen
INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
VALUES 
    (4, 'Further Maths Coursework', 'Further Mathematics', CURRENT_DATE + INTERVAL '15 days', 'in_progress', 'high'),
    (4, 'Physics Investigation', 'Physics', CURRENT_DATE + INTERVAL '10 days', 'pending', 'high'),
    (4, 'Economics Essay', 'Economics', CURRENT_DATE + INTERVAL '7 days', 'pending', 'medium');

-- Insert sample assignments for Amara Okafor
INSERT INTO assignments (student_id, title, subject, due_date, status, priority) 
VALUES 
    (5, 'Drama Performance Prep', 'Drama', CURRENT_DATE + INTERVAL '5 days', 'in_progress', 'high'),
    (5, 'Music Composition', 'Music', CURRENT_DATE + INTERVAL '12 days', 'pending', 'medium'),
    (5, 'Life Sciences Project', 'Life Sciences', CURRENT_DATE + INTERVAL '9 days', 'pending', 'medium');

-- Create activities table for extracurricular tracking
CREATE TABLE IF NOT EXISTS extracurricular_activities (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    activity_name TEXT NOT NULL,
    activity_type TEXT NOT NULL,
    hours_spent INTEGER DEFAULT 0,
    last_participation DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample extracurricular activities
INSERT INTO extracurricular_activities (student_id, activity_name, activity_type, hours_spent, last_participation) 
VALUES 
    (1, 'Soccer Team', 'Sports', 14, CURRENT_DATE - INTERVAL '2 days'),
    (1, 'Debate Club', 'Academic', 8, CURRENT_DATE - INTERVAL '5 days'),
    (2, 'Chess Club', 'Academic', 12, CURRENT_DATE - INTERVAL '1 day'),
    (2, 'Coding Club', 'Academic', 20, CURRENT_DATE - INTERVAL '3 days'),
    (2, 'Basketball', 'Sports', 10, CURRENT_DATE - INTERVAL '4 days'),
    (3, 'Drama Society', 'Arts', 18, CURRENT_DATE - INTERVAL '1 day'),
    (3, 'Art Club', 'Arts', 15, CURRENT_DATE - INTERVAL '2 days'),
    (4, 'Science Olympiad', 'Academic', 25, CURRENT_DATE - INTERVAL '1 day'),
    (4, 'Robotics Club', 'Academic', 22, CURRENT_DATE - INTERVAL '2 days'),
    (5, 'Theater Productions', 'Arts', 20, CURRENT_DATE - INTERVAL '1 day'),
    (5, 'Choir', 'Arts', 16, CURRENT_DATE - INTERVAL '3 days'),
    (5, 'Volunteer Program', 'Community', 12, CURRENT_DATE - INTERVAL '7 days');

-- Create community events table
CREATE TABLE IF NOT EXISTS community_events (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    event_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    points_earned INTEGER DEFAULT 0,
    event_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample community events
INSERT INTO community_events (student_id, event_name, event_type, points_earned, event_date) 
VALUES 
    (1, 'Beach Cleanup', 'Environmental', 50, CURRENT_DATE - INTERVAL '10 days'),
    (1, 'Food Drive', 'Charity', 70, CURRENT_DATE - INTERVAL '20 days'),
    (2, 'Tutoring Program', 'Education', 80, CURRENT_DATE - INTERVAL '5 days'),
    (2, 'Park Restoration', 'Environmental', 60, CURRENT_DATE - INTERVAL '15 days'),
    (3, 'Library Reading Program', 'Education', 45, CURRENT_DATE - INTERVAL '8 days'),
    (4, 'STEM Workshop for Kids', 'Education', 100, CURRENT_DATE - INTERVAL '3 days'),
    (5, 'Charity Concert', 'Arts', 90, CURRENT_DATE - INTERVAL '12 days'),
    (5, 'Community Garden', 'Environmental', 55, CURRENT_DATE - INTERVAL '18 days');

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- Insert sample announcements
INSERT INTO announcements (title, message, priority, expires_at) 
VALUES 
    ('Midterm Exams Schedule Released', 'Check your email for the complete midterm examination timetable for all subjects.', 'high', CURRENT_DATE + INTERVAL '30 days'),
    ('School Sports Day - Oct 15', 'Annual sports day event. Sign up for your favorite events by Oct 10.', 'medium', CURRENT_DATE + INTERVAL '20 days'),
    ('University Visit Day', 'University of Cape Town representatives will be visiting next week. Book your slot now!', 'high', CURRENT_DATE + INTERVAL '14 days'),
    ('Library Extended Hours', 'Library will be open until 8 PM during exam week to support your studies.', 'normal', CURRENT_DATE + INTERVAL '45 days'),
    ('New Online Resources Available', 'Check out the new study materials and video tutorials added to your subjects.', 'normal', CURRENT_DATE + INTERVAL '60 days');



