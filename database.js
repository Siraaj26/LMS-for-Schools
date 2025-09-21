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

    addAcademicGrade(studentId, subject, grade, assignment = '', teacher = '') {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.academic_grades) {
                student.academic_grades = [];
            }
            student.academic_grades.push({
                subject,
                grade: parseFloat(grade),
                assignment,
                teacher,
                date: new Date().toISOString(),
                trend: this.calculateTrend(student.academic_grades, subject, grade)
            });
            return student.academic_grades;
        }
        return null;
    }

    getAcademicGrades(studentId) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        return student ? student.academic_grades || [] : [];
    }

    updateAcademicGrade(studentId, subject, newGrade) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student && student.academic_grades) {
            const subjectGrades = student.academic_grades.filter(g => g.subject === subject);
            if (subjectGrades.length > 0) {
                const latestGrade = subjectGrades[subjectGrades.length - 1];
                latestGrade.grade = parseFloat(newGrade);
                latestGrade.trend = this.calculateTrend(subjectGrades, subject, newGrade);
                return latestGrade;
            }
        }
        return null;
    }

    // Skills Management
    updateSkillLevel(studentId, skillName, newLevel) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.skills) {
                student.skills = [];
            }
            const existingSkill = student.skills.find(s => s.name === skillName);
            if (existingSkill) {
                existingSkill.level = parseInt(newLevel);
                existingSkill.status = this.getSkillStatus(newLevel);
                existingSkill.lastUpdated = new Date().toISOString();
            } else {
                student.skills.push({
                    name: skillName,
                    level: parseInt(newLevel),
                    status: this.getSkillStatus(newLevel),
                    lastUpdated: new Date().toISOString()
                });
            }
            return student.skills;
        }
        return null;
    }

    // Attendance Management
    updateAttendance(studentId, attendancePercentage) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            student.attendance = parseFloat(attendancePercentage);
            student.attendance_updated = new Date().toISOString();
            return student.attendance;
        }
        return null;
    }

    // Assignments Management
    createAssignment(teacherId, assignmentData) {
        const assignment = {
            id: Date.now(),
            ...assignmentData,
            createdBy: teacherId,
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        
        if (!window.assignments) {
            window.assignments = [];
        }
        window.assignments.push(assignment);
        
        // Add to teacher's assignments
        const teacher = this.users.find(u => u.id === teacherId && u.user_type === 'teacher');
        if (teacher) {
            if (!teacher.assignments) {
                teacher.assignments = [];
            }
            teacher.assignments.push(assignment);
        }
        
        return assignment;
    }

    getAssignmentsByClass(classCode) {
        return (window.assignments || []).filter(a => a.class === classCode);
    }

    getStudentAssignments(studentId) {
        return (window.assignments || []).filter(a => a.assigned_to === studentId);
    }

    updateAssignmentStatus(assignmentId, status) {
        const assignment = (window.assignments || []).find(a => a.id === assignmentId);
        if (assignment) {
            assignment.status = status;
            assignment.updatedAt = new Date().toISOString();
            return assignment;
        }
        return null;
    }

    // Announcements Management
    createAnnouncement(authorId, title, content, targetAudience = 'all') {
        const announcement = {
            id: Date.now(),
            title,
            content,
            authorId,
            targetAudience,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        
        if (!window.announcements) {
            window.announcements = [];
        }
        window.announcements.push(announcement);
        return announcement;
    }

    getActiveAnnouncements(targetAudience = 'all') {
        return (window.announcements || []).filter(a => 
            a.isActive && (a.targetAudience === 'all' || a.targetAudience === targetAudience)
        );
    }

    // Soft Skills Management
    updateSoftSkillsProgress(studentId, badgesEarned, modulesCompleted, points = 0) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.soft_skills) {
                student.soft_skills = {};
            }
            student.soft_skills.badges_earned = (student.soft_skills.badges_earned || 0) + parseInt(badgesEarned);
            student.soft_skills.modules_completed = (student.soft_skills.modules_completed || 0) + parseInt(modulesCompleted);
            student.soft_skills.total_points = (student.soft_skills.total_points || 0) + parseInt(points);
            student.soft_skills.last_updated = new Date().toISOString();
            return student.soft_skills;
        }
        return null;
    }

    // Extracurricular Activities Management
    addStudentActivity(studentId, activityName, hours = 0) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.extracurricular) {
                student.extracurricular = [];
            }
            student.extracurricular.push({
                activity: activityName,
                hours: parseInt(hours),
                added_at: new Date().toISOString()
            });
            return student.extracurricular;
        }
        return null;
    }

    getTotalActivityHours(studentId) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student && student.extracurricular) {
            return student.extracurricular.reduce((total, activity) => total + activity.hours, 0);
        }
        return 0;
    }

    // Community Points Management
    addCommunityPoints(studentId, points, eventName = '') {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            if (!student.community_points) {
                student.community_points = 0;
            }
            if (!student.community_events) {
                student.community_events = [];
            }
            student.community_points += parseInt(points);
            student.community_events.push({
                event: eventName,
                points: parseInt(points),
                date: new Date().toISOString()
            });
            return student.community_points;
        }
        return null;
    }

    // Class Statistics Management
    updateClassStats(classCode, studentCount, assignmentCount, averageGrade) {
        if (!window.classStats) {
            window.classStats = {};
        }
        window.classStats[classCode] = {
            studentCount: parseInt(studentCount),
            assignmentCount: parseInt(assignmentCount),
            averageGrade: parseFloat(averageGrade),
            classProgress: parseFloat(averageGrade),
            updatedAt: new Date().toISOString()
        };
        return window.classStats[classCode];
    }

    getClassStats(classCode) {
        return window.classStats ? window.classStats[classCode] : null;
    }

    // Student Progress Categories
    updateStudentProgressCategory(studentId, category) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            student.progress_category = category;
            student.progress_updated = new Date().toISOString();
            return student.progress_category;
        }
        return null;
    }

    getStudentsByProgressCategory(category) {
        return this.users.filter(u => u.user_type === 'student' && u.progress_category === category);
    }

    // Payment Management
    updatePaymentAmount(studentId, amount, dueDate = null) {
        const student = this.users.find(u => u.id === studentId && u.user_type === 'student');
        if (student) {
            student.payment_amount = parseFloat(amount);
            if (dueDate) {
                student.payment_due_date = dueDate;
            }
            student.payment_updated = new Date().toISOString();
            return student.payment_amount;
        }
        return null;
    }

    // Dashboard Statistics Aggregation
    getDashboardStats(userId, userType) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return null;

        switch (userType) {
            case 'student':
                return {
                    announcements: this.getActiveAnnouncements('students').length,
                    assignmentsDue: this.getStudentAssignments(userId).filter(a => a.status === 'pending').length,
                    averageGrade: this.calculateAverageGrade(user.academic_grades || []),
                    subjects: (user.academic_grades || []).length,
                    overdue: this.getStudentAssignments(userId).filter(a => a.status === 'overdue').length,
                    badges: user.soft_skills ? user.soft_skills.badges_earned || 0 : 0,
                    modulesCompleted: user.soft_skills ? user.soft_skills.modules_completed || 0 : 0,
                    activities: user.extracurricular ? user.extracurricular.length : 0,
                    totalHours: this.getTotalActivityHours(userId),
                    communityPoints: user.community_points || 0,
                    communityEvents: user.community_events ? user.community_events.length : 0
                };

            case 'parent':
                const student = this.getStudentByParentEmail(user.email);
                if (student) {
                    return {
                        children: 1, // Assuming one child for now
                        attendance: student.attendance || 0,
                        academicGrades: student.academic_grades || [],
                        skills: student.skills || [],
                        paymentAmount: student.payment_amount || 0,
                        paymentStatus: student.payment_status || 'pending'
                    };
                }
                return null;

            case 'teacher':
                const teacherClasses = this.getTeacherClasses(userId);
                return {
                    classes: teacherClasses.length,
                    totalStudents: this.getTotalStudentsByTeacher(userId),
                    subjects: this.getUniqueSubjectsByTeacher(userId).length,
                    classStats: teacherClasses.map(cls => this.getClassStats(cls.code))
                };

            default:
                return null;
        }
    }

    // Helper methods
    calculateTrend(grades, subject, newGrade) {
        const subjectGrades = grades.filter(g => g.subject === subject);
        if (subjectGrades.length < 2) return '+0%';
        
        const previousGrade = subjectGrades[subjectGrades.length - 2].grade;
        const difference = newGrade - previousGrade;
        return difference > 0 ? `+${difference}%` : `${difference}%`;
    }

    getSkillStatus(level) {
        if (level >= 90) return 'Expert';
        if (level >= 75) return 'Advanced';
        if (level >= 60) return 'Intermediate';
        return 'Beginner';
    }

    calculateAverageGrade(grades) {
        if (!grades || grades.length === 0) return 0;
        const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
        return Math.round(total / grades.length);
    }

    getTeacherClasses(teacherId) {
        // Return demo classes for now
        return [
            { code: 'MATH8A', name: 'Mathematics Grade 8A' },
            { code: 'MATH9B', name: 'Mathematics Grade 9B' },
            { code: 'MATH10A', name: 'Mathematics Grade 10A' },
            { code: 'MATH11B', name: 'Mathematics Grade 11B' },
            { code: 'MATH12A', name: 'Advanced Mathematics 12' }
        ];
    }

    getTotalStudentsByTeacher(teacherId) {
        // Return demo number for now
        return 142;
    }

    getUniqueSubjectsByTeacher(teacherId) {
        return ['Mathematics'];
    }
}

// Create global database instance
window.authDB = new SimpleAuthDB();

// Log demo users for verification
console.log('Demo users loaded:', window.authDB.getAllUsers());
