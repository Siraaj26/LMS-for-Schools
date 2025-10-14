-- Create grades table for student performance tracking
CREATE TABLE grades (
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

-- Insert sample grades for test student (assuming student ID is 1)
INSERT INTO grades (student_id, subject, maths, english, science, history, term) 
VALUES 
    (1, 'Mathematics', 85, 78, 90, 82, 'Term 1'),
    (1, 'English', 78, 88, 85, 79, 'Term 1'),
    (1, 'Science', 90, 85, 92, 88, 'Term 1'),
    (1, 'History', 82, 79, 88, 85, 'Term 1');






