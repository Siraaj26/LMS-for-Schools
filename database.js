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
}

// Create global database instance
window.authDB = new SimpleAuthDB();

// Log demo users for verification
console.log('Demo users loaded:', window.authDB.getAllUsers());
