-- Insert test student
INSERT INTO student_login (full_name, email, password, user_type, parent_email, phone_number, current_grade, location, target_university) 
VALUES ('John Student', 'student@test.com', 'password123', 'student', 'parent@test.com', '555-0101', 'Grade 11', 'New York, USA', 'Harvard University');

-- Insert test parent
INSERT INTO parent_login (full_name, parent_email, phone_number, password, user_type, student_email) 
VALUES ('Jane Parent', 'parent@test.com', '555-0102', 'password123', 'parent', 'student@test.com');

-- Insert test teacher
INSERT INTO admin_login (email, full_name, password, user_type) 
VALUES ('teacher@test.com', 'Mike Teacher', 'password123', 'teacher');
