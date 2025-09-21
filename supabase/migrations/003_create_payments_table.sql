-- Migration: create payments table for student fee tracking
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES student_login(id),
    amount DECIMAL NOT NULL,
    term TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- e.g., 'paid', 'pending', 'overdue'
    payment_date DATE,
    method TEXT, -- e.g., 'Credit Card', 'Bank Transfer'
    transaction_id TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);