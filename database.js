// SQLite database setup for demo users
// This creates a simple in-memory database for demo purposes

class SimpleAuthDB {
    constructor() {
        this.users = [
            {
                id: 1,
                email: 'mojefthcpt024@student.wethinkcode.co.za',
                password: 'Password@123',
                user_type: 'student',
                full_name: 'Moje Student',
                parent_email: 'kemilescpt024@student.wethinkcode.co.za',
                phone_number: '1234567890',
                current_grade: 'Grade 12',
                location: 'Cape Town, South Africa',
                target_university: 'University of Cape Town'
            },
            {
                id: 2,
                email: 'kemilescpt024@student.wethinkcode.co.za',
                password: 'Password@123',
                user_type: 'parent',
                full_name: 'Kemile Parent',
                phone_number: '0987654321',
                student_email: 'mojefthcpt024@student.wethinkcode.co.za'
            },
            {
                id: 3,
                email: 'admin@gmail.com',
                password: 'Password@123',
                user_type: 'teacher',
                full_name: 'Admin User'
            }
        ];
    }

    // Authenticate user
    authenticate(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            // Return user without password
            const { password, ...userWithoutPassword } = user;
            return { success: true, user: userWithoutPassword };
        }
        return { success: false, error: 'Invalid email or password' };
    }

    // Get user by email
    getUserByEmail(email) {
        const user = this.users.find(u => u.email === email);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    // Create new user (for signup)
    createUser(userData) {
        const newId = Math.max(...this.users.map(u => u.id)) + 1;
        const newUser = {
            id: newId,
            ...userData,
            created_at: new Date().toISOString()
        };
        this.users.push(newUser);
        
        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    // Check if user exists
    userExists(email) {
        return this.users.some(u => u.email === email);
    }

    // Get all users (for debugging)
    getAllUsers() {
        return this.users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    // Get student by parent email
    getStudentByParentEmail(parentEmail) {
        return this.users.find(u => u.user_type === 'student' && u.parent_email === parentEmail);
    }

    // Get parent by student email
    getParentByStudentEmail(studentEmail) {
        return this.users.find(u => u.user_type === 'parent' && u.student_email === studentEmail);
    }

    // Update user data
    updateUser(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.users[userIndex], ...updates };
            return this.users[userIndex];
        }
        return null;
    }

    // Add academic progress
    addAcademicProgress(studentId, subject, grade, assignment) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.academic_progress) {
                student.academic_progress = [];
            }
            student.academic_progress.push({
                subject,
                grade,
                assignment,
                date: new Date().toISOString()
            });
            return student.academic_progress;
        }
        return null;
    }

    // Add skills assessment
    addSkillsAssessment(studentId, skill, level) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.skills) {
                student.skills = [];
            }
            const existingSkill = student.skills.find(s => s.name === skill);
            if (existingSkill) {
                existingSkill.level = level;
                existingSkill.lastUpdated = new Date().toISOString();
            } else {
                student.skills.push({
                    name: skill,
                    level,
                    lastUpdated: new Date().toISOString()
                });
            }
            return student.skills;
        }
        return null;
    }

    // Add activity/event
    addActivity(userId, activity) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            if (!user.activities) {
                user.activities = [];
            }
            user.activities.unshift({
                ...activity,
                date: new Date().toISOString()
            });
            // Keep only last 10 activities
            if (user.activities.length > 10) {
                user.activities = user.activities.slice(0, 10);
            }
            return user.activities;
        }
        return null;
    }

    // Update payment status
    updatePaymentStatus(studentId, status, amount) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            student.payment_status = status;
            student.payment_amount = amount;
            student.last_payment_update = new Date().toISOString();
            return student;
        }
        return null;
    }

    // Get students by teacher (for admin dashboard)
    getStudentsByTeacher(teacherEmail) {
        // In a real app, this would be based on teacher assignments
        // For demo, return all students
        return this.users.filter(u => u.user_type === 'student');
    }

    // Create assignment
    createAssignment(teacherId, assignmentData) {
        const teacher = this.users.find(u => u.id === teacherId && u.user_type === 'teacher');
        if (teacher) {
            if (!teacher.assignments) {
                teacher.assignments = [];
            }
            const assignment = {
                id: Date.now(),
                ...assignmentData,
                createdBy: teacherId,
                createdAt: new Date().toISOString(),
                status: 'active'
            };
            teacher.assignments.push(assignment);
            return assignment;
        }
        return null;
    }

    // Admin functions
    getAdminStats() {
        const students = this.users.filter(u => u.user_type === 'student');
        const parents = this.users.filter(u => u.user_type === 'parent');
        const teachers = this.users.filter(u => u.user_type === 'teacher');
        
        return {
            totalStudents: students.length,
            totalParents: parents.length,
            totalTeachers: teachers.length,
            pendingTasks: 13, // Demo number
            upcomingMeetings: 0, // Demo number
            completionRate: 35 // Demo percentage
        };
    }

    // Task management
    createTask(title, description, assignedTo) {
        const task = {
            id: Date.now(),
            title,
            description,
            assignedTo,
            status: 'pending',
            createdAt: new Date().toISOString(),
            completedAt: null
        };
        
        // Store in global tasks array
        if (!window.adminTasks) {
            window.adminTasks = [];
        }
        window.adminTasks.push(task);
        return task;
    }

    getTasks() {
        if (!window.adminTasks) {
            // Initialize with demo tasks
            window.adminTasks = [
                { id: 1, title: 'Review student applications', description: 'Review pending student applications', assignedTo: 'Admin', status: 'pending', createdAt: '2024-01-15' },
                { id: 2, title: 'Update curriculum', description: 'Update mathematics curriculum', assignedTo: 'Teacher', status: 'pending', createdAt: '2024-01-16' },
                { id: 3, title: 'Parent meeting', description: 'Schedule parent-teacher meetings', assignedTo: 'Admin', status: 'pending', createdAt: '2024-01-17' }
            ];
        }
        return window.adminTasks;
    }

    completeTask(taskId) {
        if (window.adminTasks) {
            const task = window.adminTasks.find(t => t.id === taskId);
            if (task) {
                task.status = 'completed';
                task.completedAt = new Date().toISOString();
                return task;
            }
        }
        return null;
    }

    // Meeting management
    createMeeting(title, date, time, participants) {
        const meeting = {
            id: Date.now(),
            title,
            date,
            time,
            participants,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        };
        
        if (!window.adminMeetings) {
            window.adminMeetings = [];
        }
        window.adminMeetings.push(meeting);
        return meeting;
    }

    getMeetings() {
        if (!window.adminMeetings) {
            window.adminMeetings = [];
        }
        return window.adminMeetings;
    }
}

// Create global database instance
window.authDB = new SimpleAuthDB();

// Log demo users for verification
console.log('Demo users loaded:', window.authDB.getAllUsers());
