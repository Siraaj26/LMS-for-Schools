// SQLite-like in-memory database for demo users
// This creates a simple in-memory database for demo purposes

class SimpleAuthDB {
    constructor() {
        this.users = [
            {
                id: 1,
                email: 'student@test.com',
                password: 'password123',
                user_type: 'student',
                full_name: 'Test Student',
                parent_email: 'parent@test.com',
                phone_number: '1234567890',
                current_grade: 'Grade 10',
                location: 'Johannesburg, South Africa',
                target_university: 'University of Johannesburg'
            },
            {
                id: 2,
                email: 'parent@test.com',
                password: 'password123',
                user_type: 'parent',
                full_name: 'Test Parent',
                phone_number: '0987654321',
                student_email: 'student@test.com'
            },
            {
                id: 3,
                email: 'teacher@test.com',
                password: 'password123',
                user_type: 'teacher',
                full_name: 'Test Teacher'
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
}

// Create global database instance
if (typeof window !== 'undefined') {
    window.authDB = new SimpleAuthDB();
    console.log('✅ Local database loaded with demo users:', window.authDB.getAllUsers());
}


