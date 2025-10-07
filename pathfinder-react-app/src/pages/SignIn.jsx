import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseConfig';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if fields are filled
        if (!email || !password) {
            alert('Please fill in all fields!');
            return;
        }
        
        setLoading(true);
        
        try {
            // Sign in with Supabase Auth
            const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (authError) throw authError;

            console.log('✅ Signed in successfully:', authData);

            // Store user info
            localStorage.setItem('currentUserEmail', email);
            localStorage.setItem('userEmail', email);
            
            // Get user profile from database to determine role
            const { data: profile, error: profileError } = await supabaseClient
                .from('student_login')
                .select('user_type, id')
                .eq('email', email)
                .single();

            console.log('📊 User profile:', profile);

            // Redirect based on user type
            if (profile && !profileError) {
                localStorage.setItem('userId', profile.id);
                localStorage.setItem('userType', profile.user_type);
                
                if (profile.user_type === 'teacher') {
                    navigate('/teacher/dashboard');
                } else if (profile.user_type === 'parent') {
                    navigate('/parent/dashboard');
                } else {
                    navigate('/student/dashboard');
                }
            } else {
                // Default to student dashboard if no profile found
                console.warn('⚠️ No profile found, defaulting to student dashboard');
                navigate('/student/dashboard');
            }
        } catch (error) {
            console.error('❌ Sign in error:', error);
            alert(error.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-form">
                <h1>Pathfinder Vanguard</h1>
                <p className="subtitle">Welcome back! Please sign in to your account.</p>
                
                <form id="signinForm" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <div className="form-footer">
                        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;

