import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseConfig';

function SignUp() {
    const [formData, setFormData] = useState({
        studentFullName: '',
        studentEmail: '',
        studentPassword: '',
        confirmPassword: '',
        currentGrade: '',
        phoneNumber: '',
        location: '',
        targetUniversity: '',
        parentFullName: '',
        parentEmail: '',
        parentPhoneNumber: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.studentPassword !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (!formData.studentFullName || !formData.studentEmail || !formData.studentPassword || 
            !formData.currentGrade || !formData.phoneNumber || !formData.location || 
            !formData.targetUniversity || !formData.parentFullName || !formData.parentEmail || 
            !formData.parentPhoneNumber) {
            alert('Please fill in all required fields!');
            return;
        }
        
        setLoading(true);
        
        try {
            console.log('🔄 Starting signup process...');

            // Step 1: Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabaseClient.auth.signUp({
                email: formData.studentEmail,
                password: formData.studentPassword,
            });

            if (authError) throw authError;

            console.log('✅ Auth user created:', authData);

            // Step 2: Create student profile in database
            const { data: profileData, error: profileError } = await supabaseClient
                .from('student_login')
                .insert([
                    {
                        email: formData.studentEmail,
                        full_name: formData.studentFullName,
                        user_type: 'student',
                        phone_number: formData.phoneNumber,
                        current_grade: formData.currentGrade,
                        location: formData.location,
                        target_university: formData.targetUniversity,
                        parent_email: formData.parentEmail
                    }
                ])
                .select();

            if (profileError) {
                console.error('⚠️ Profile creation error:', profileError);
                // Continue anyway - user is created in Auth
            } else {
                console.log('✅ Profile created:', profileData);
            }

            // Store user data
            localStorage.setItem('currentUserEmail', formData.studentEmail);
            localStorage.setItem('userEmail', formData.studentEmail);
            localStorage.setItem('userType', 'student');
            
            alert('Account created successfully! ✅\n\nYou can now sign in with your credentials.');
            
            // Redirect to sign in page
            navigate('/signin');
        } catch (error) {
            console.error('❌ Signup error:', error);
            
            if (error.message.includes('already registered')) {
                alert('This email is already registered. Please sign in instead.');
            } else {
                alert(error.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="apple-auth-container">
            <div className="apple-auth-card large">
                <div className="auth-header">
                    <h1 className="auth-title">Horizon</h1>
                    <p className="auth-subtitle">Please provide your information to create your student account.</p>
                </div>
                
                <form className="apple-auth-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2 className="section-title">Student Information</h2>
                        
                        <div className="apple-input-group">
                            <input 
                                type="text" 
                                id="studentFullName" 
                                name="studentFullName" 
                                placeholder="Full Name *"
                                value={formData.studentFullName}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="email" 
                                id="studentEmail" 
                                name="studentEmail" 
                                placeholder="Email Address *"
                                value={formData.studentEmail}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="password" 
                                id="studentPassword" 
                                name="studentPassword" 
                                placeholder="Password *"
                                value={formData.studentPassword}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Confirm Password *"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="text" 
                                id="currentGrade" 
                                name="currentGrade" 
                                placeholder="Current Grade (e.g., Grade 11) *"
                                value={formData.currentGrade}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="tel" 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                placeholder="Phone Number *"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="text" 
                                id="location" 
                                name="location" 
                                placeholder="City, Country *"
                                value={formData.location}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="text" 
                                id="targetUniversity" 
                                name="targetUniversity" 
                                placeholder="Target University/School *"
                                value={formData.targetUniversity}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="form-section">
                        <h2 className="section-title">Parent/Guardian Information</h2>
                        
                        <div className="apple-input-group">
                            <input 
                                type="text" 
                                id="parentFullName" 
                                name="parentFullName" 
                                placeholder="Parent/Guardian Full Name *"
                                value={formData.parentFullName}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="email" 
                                id="parentEmail" 
                                name="parentEmail" 
                                placeholder="Parent/Guardian Email *"
                                value={formData.parentEmail}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                        
                        <div className="apple-input-group">
                            <input 
                                type="tel" 
                                id="parentPhoneNumber" 
                                name="parentPhoneNumber" 
                                placeholder="Parent/Guardian Phone Number *"
                                value={formData.parentPhoneNumber}
                                onChange={handleChange}
                                className="apple-input"
                                required
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="apple-button primary full-width" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

