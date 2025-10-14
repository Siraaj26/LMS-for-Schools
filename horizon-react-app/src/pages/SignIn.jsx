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
            // Find user in custom login tables (not Supabase Auth)
            let profile = null;
            let profileError = null;
            
            console.log('🔍 Searching for user in custom tables...');
            
            // First try student_login
            const { data: studentProfile, error: studentError } = await supabaseClient
                .from('student_login')
                .select('user_type, id, full_name, current_grade, location, email, password')
                .eq('email', email)
                .single();

            if (studentProfile && !studentError) {
                // Verify password
                if (studentProfile.password === password) {
                    profile = studentProfile;
                    profile.user_type = 'student';
                    console.log('✅ Found and verified student:', profile);
                } else {
                    throw new Error('Invalid password');
                }
            } else {
                // Try parent_login
                const { data: parentProfile, error: parentError } = await supabaseClient
                    .from('parent_login')
                    .select('full_name, parent_email, password')
                    .eq('parent_email', email)
                    .single();

                if (parentProfile && !parentError) {
                    // Verify password
                    if (parentProfile.password === password) {
                        profile = {
                            ...parentProfile,
                            user_type: 'parent',
                            id: parentProfile.parent_email, // Use email as ID for parents
                            email: parentProfile.parent_email
                        };
                        console.log('✅ Found and verified parent:', profile);
                    } else {
                        throw new Error('Invalid password');
                    }
                } else {
                    // Try admin_login (teachers)
                    const { data: adminProfile, error: adminError } = await supabaseClient
                        .from('admin_login')
                        .select('user_type, id, full_name, email, password')
                        .eq('email', email)
                        .single();

                    if (adminProfile && !adminError) {
                        // Verify password
                        if (adminProfile.password === password) {
                            profile = {
                                ...adminProfile,
                                user_type: 'teacher'
                            };
                            console.log('✅ Found and verified teacher:', profile);
                        } else {
                            throw new Error('Invalid password');
                        }
                    } else {
                        throw new Error('User not found. Please check your email or sign up.');
                    }
                }
            }

            // Store user info
            localStorage.setItem('currentUserEmail', email);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userId', profile.id);
            localStorage.setItem('userType', profile.user_type);
            
            // Store additional user info for dashboard display
            if (profile.full_name) {
                localStorage.setItem('userFullName', profile.full_name);
            }
            if (profile.current_grade) {
                localStorage.setItem('userGrade', profile.current_grade);
            }
            if (profile.location) {
                localStorage.setItem('userLocation', profile.location);
            }
            
            console.log('✅ Authentication successful, redirecting...');
            
            // Redirect based on user type
            if (profile.user_type === 'teacher') {
                navigate('/teacher/dashboard');
            } else if (profile.user_type === 'parent') {
                navigate('/parent/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (error) {
            console.error('❌ Sign in error:', error);
            
            // Provide more specific error messages
            if (error.message?.includes('Invalid API key')) {
                alert('❌ Database connection error. Please contact support or try again later.');
            } else if (error.message?.includes('Invalid login credentials')) {
                alert('❌ Invalid email or password. Please check your credentials and try again.');
            } else if (error.message?.includes('Email not confirmed')) {
                alert('❌ Please check your email and confirm your account before signing in.');
            } else {
                alert(`❌ Sign in failed: ${error.message || 'Please try again later.'}`);
            }
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

