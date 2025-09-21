-- Help us create the database
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS student_login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    parent_email TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS parent_login (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    FOREIGN KEY(email) REFERENCES student_login(parent_email)
);

