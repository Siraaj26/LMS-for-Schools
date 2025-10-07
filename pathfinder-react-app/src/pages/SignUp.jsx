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
        <div className="signup-container">
            <div className="signup-form">
                <h1>Pathfinder Vanguard</h1>
                <p className="subtitle">Please provide your information to create your student account.</p>
                
                <form id="signupForm" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2>Student Information</h2>
                        
                        <div className="form-group">
                            <label htmlFor="studentFullName">Full Name *</label>
                            <input 
                                type="text" 
                                id="studentFullName" 
                                name="studentFullName" 
                                placeholder="Enter your full name."
                                value={formData.studentFullName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="studentEmail">Email *</label>
                            <input 
                                type="email" 
                                id="studentEmail" 
                                name="studentEmail" 
                                placeholder="lungile@pathfinderglobalacademy.com"
                                value={formData.studentEmail}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="studentPassword">Password *</label>
                            <input 
                                type="password" 
                                id="studentPassword" 
                                name="studentPassword" 
                                placeholder="Enter your password."
                                value={formData.studentPassword}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Confirm your password."
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="currentGrade">Current Grade *</label>
                            <input 
                                type="text" 
                                id="currentGrade" 
                                name="currentGrade" 
                                placeholder="e.g., Grade 11"
                                value={formData.currentGrade}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number *</label>
                            <input 
                                type="tel" 
                                id="phoneNumber" 
                                name="phoneNumber" 
                                placeholder="(555) 123-4567"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="location">Location *</label>
                            <input 
                                type="text" 
                                id="location" 
                                name="location" 
                                placeholder="City, Country"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="targetUniversity">Target University/School *</label>
                            <input 
                                type="text" 
                                id="targetUniversity" 
                                name="targetUniversity" 
                                placeholder="e.g., Stanford University"
                                value={formData.targetUniversity}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div className="form-section">
                        <h2>Parent/Guardian Information</h2>
                        
                        <div className="form-group">
                            <label htmlFor="parentFullName">Parent/Guardian Full Name *</label>
                            <input 
                                type="text" 
                                id="parentFullName" 
                                name="parentFullName" 
                                placeholder="Enter parent/guardian full name."
                                value={formData.parentFullName}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="parentEmail">Parent/Guardian Email *</label>
                            <input 
                                type="email" 
                                id="parentEmail" 
                                name="parentEmail" 
                                placeholder="parent.email@example.com"
                                value={formData.parentEmail}
                                onChange={handleChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="parentPhoneNumber">Parent/Guardian Phone Number *</label>
                            <input 
                                type="tel" 
                                id="parentPhoneNumber" 
                                name="parentPhoneNumber" 
                                placeholder="(555) 123-4567"
                                value={formData.parentPhoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;

