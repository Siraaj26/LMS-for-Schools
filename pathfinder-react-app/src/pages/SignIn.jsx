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
        <div className="apple-auth-container">
            <div className="apple-auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Horizon</h1>
                    <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
                </div>
                
                <form className="apple-auth-form" onSubmit={handleSubmit}>
                    <div className="apple-input-group">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="apple-input"
                            required
                        />
                    </div>
                    
                    <div className="apple-input-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="apple-input"
                            required
                        />
                    </div>
                    
                    <button type="submit" className="apple-button primary full-width" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    
                    <div className="auth-footer">
                        <p>Don't have an account? <a href="/signup" className="auth-link">Sign up here</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;

