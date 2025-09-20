-- Create student table
CREATE TABLE student_login (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT DEFAULT 'student',
    parent_email TEXT,
    phone_number TEXT,
    current_grade TEXT,
    location TEXT,
    target_university TEXT
);

-- Create parent table
CREATE TABLE parent_login (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT DEFAULT 'parent',
    student_email TEXT
);

-- Create admin/teacher table
CREATE TABLE admin_login (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    password TEXT NOT NULL,
    user_type TEXT DEFAULT 'teacher'
);

-- Create grades table
CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INTEGER,
    maths DECIMAL,
    english DECIMAL,
    student_name TEXT
);