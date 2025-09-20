// const SUPABASE_URL = 'YOUR_SUPABASE_URL';
// const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
// let supabase;

// function initializeSupabase() {
//     if (typeof window.supabase !== 'undefined') {
//         supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//         console.log('✅ Supabase initialized');
        
//         supabase.auth.onAuthStateChange((event, session) => {
//             console.log('Auth state changed:', event, session);
//             handleAuthStateChange(event, session);
//         });
//     } else {
//         console.error('❌ Supabase library not loaded. Make sure to include the Supabase script.');
//     }
// }
// function handleAuthStateChange(event, session) {
//     if (event === 'SIGNED_IN') {
//         updateUIForSignedInUser(session.user);
//         showSuccessMessage(`Welcome back, ${session.user.email}! 🎉`);
//     } else if (event === 'SIGNED_OUT') {
//         updateUIForSignedOutUser();
//         showSuccessMessage('You have been signed out successfully! 👋');
//     } else if (event === 'SIGNED_UP') {
//         showSuccessMessage('Account created successfully! Please check your email to verify your account. 📧');
//     }
// }

// function updateUIForSignedInUser(user) {
//     const authButtons = document.querySelectorAll('#signInBtn, #signUpBtn, #heroSignInBtn, #heroSignUpBtn, #stepsSignUpBtn, #futureSignUpBtn');
//     authButtons.forEach(btn => {
//         if (btn) {
//             btn.style.display = 'none';
//         }
//     });
//     addUserMenu(user);
// }

// function updateUIForSignedOutUser() {
//     const authButtons = document.querySelectorAll('#signInBtn, #signUpBtn, #heroSignInBtn, #heroSignUpBtn, #stepsSignUpBtn, #futureSignUpBtn');
//     authButtons.forEach(btn => {
//         if (btn) {
//             btn.style.display = 'inline-block';
//         }
//     });
//     const userMenu = document.querySelector('.user-menu');
//     if (userMenu) {
//         userMenu.remove();
//     }
// }

// function addUserMenu(user) {
//     const navbar = document.querySelector('.navbar-auth');
//     if (navbar && !document.querySelector('.user-menu')) {
//         const userMenu = document.createElement('div');
//         userMenu.className = 'user-menu';
//         userMenu.innerHTML = `
//             <div class="user-dropdown">
//                 <button class="user-button">
//                     <span class="user-avatar">${user.email.charAt(0).toUpperCase()}</span>
//                     <span class="user-email">${user.email}</span>
//                 </button>
//                 <div class="dropdown-menu">
//                     <a href="#" class="dropdown-item">Profile</a>
//                     <a href="#" class="dropdown-item">Dashboard</a>
//                     <a href="#" class="dropdown-item">Settings</a>
//                     <hr class="dropdown-divider">
//                     <button class="dropdown-item" onclick="handleSignOut()">Sign Out</button>
//                 </div>
//             </div>
//         `;
//         navbar.appendChild(userMenu);
//         addUserMenuStyles();
//     }
// }

// function handleSignUp() {
//     showAuthModal('signup');
// }

// function handleSignIn() {
//     showAuthModal('signin');
// }

// async function handleSignOut() {
//     try {
//         const { error } = await supabase.auth.signOut();
//         if (error) throw error;
//     } catch (error) {
//         console.error('Error signing out:', error);
//         showErrorMessage('Error signing out. Please try again.');
//     }
// }

// function showAuthModal(type) {
//     const modalTitle = type === 'signup' ? 'Create Account' : 'Sign In';
//     const buttonText = type === 'signup' ? 'Get Started' : 'Sign In';
    
//     const modalHTML = `
//         <div class="auth-modal-overlay" id="authModal">
//             <div class="auth-modal">
//                 <div class="auth-modal-header">
//                     <h2>${modalTitle}</h2>
//                     <button class="close-modal" onclick="closeAuthModal()">&times;</button>
//                 </div>
//                 <div class="auth-modal-body">
//                     <form class="auth-form" onsubmit="handleAuthSubmit(event, '${type}')">
//                         <div class="form-group">
//                             <label for="email">Email Address</label>
//                             <input type="email" id="email" name="email" required placeholder="Enter your email">
//                         </div>
//                         <div class="form-group">
//                             <label for="password">Password</label>
//                             <input type="password" id="password" name="password" required placeholder="Enter your password">
//                         </div>
//                         ${type === 'signup' ? `
//                         <div class="form-group">
//                             <label for="confirmPassword">Confirm Password</label>
//                             <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm your password">
//                         </div>
//                         <div class="form-group">
//                             <label for="fullName">Full Name</label>
//                             <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
//                         </div>
//                         ` : ''}
//                         <button type="submit" class="btn btn-primary btn-full">${buttonText}</button>
//                     </form>
//                     <div class="auth-divider">
//                         <span>or</span>
//                     </div>
//                     <div class="auth-switch">
//                         ${type === 'signup' 
//                             ? `<p>Already have an account? <a href="#" onclick="showAuthModal('signin')">Sign In</a></p>`
//                             : `<p>Don't have an account? <a href="#" onclick="showAuthModal('signup')">Sign Up</a></p>`
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     const existingModal = document.getElementById('authModal');
//     if (existingModal) {
//         existingModal.remove();
//     }
    
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
    
//     addAuthModalStyles();
    
//     setTimeout(() => {
//         const firstInput = document.querySelector('.auth-modal input');
//         if (firstInput) firstInput.focus();
//     }, 100);
// }

// function closeAuthModal() {
//     const modal = document.getElementById('authModal');
//     if (modal) {
//         modal.classList.add('closing');
//         setTimeout(() => modal.remove(), 300);
//     }
// }

// async function handleAuthSubmit(event, type) {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const data = Object.fromEntries(formData.entries());
    
//     if (type === 'signup') {
//         if (data.password !== data.confirmPassword) {
//             showErrorMessage('Passwords do not match!');
//             return;
//         }
//         if (data.password.length < 6) {
//             showErrorMessage('Password must be at least 6 characters long!');
//             return;
//         }
//     }
//     const submitButton = event.target.querySelector('button[type="submit"]');
//     const originalText = submitButton.textContent;
//     submitButton.textContent = type === 'signup' ? 'Creating Account...' : 'Signing In...';
//     submitButton.disabled = true;
    
//     try {
//         if (type === 'signup') {
//             const { data: authData, error } = await supabase.auth.signUp({
//                 email: data.email,
//                 password: data.password,
//                 options: {
//                     data: {
//                         full_name: data.fullName,
//                     }
//                 }
//             });
            
//             if (error) throw error;
            
//             closeAuthModal();
//             if (authData.user && !authData.session) {
//                 showSuccessMessage('Account created! Please check your email to verify your account. 📧');
//             } else {
//                 showSuccessMessage(`Welcome to Empiras Global Academy, ${data.fullName}! 🎉`);
//             }
            
//         } else {
//             const { data: authData, error } = await supabase.auth.signInWithPassword({
//                 email: data.email,
//                 password: data.password,
//             });
            
//             if (error) throw error;
            
//             closeAuthModal();
//             showSuccessMessage(`Welcome back, ${authData.user.email}! ✨`);
//         }
        
//     } catch (error) {
//         console.error('Authentication error:', error);
//         let errorMessage = 'An error occurred. Please try again.';
        
//         if (error.message.includes('Invalid login credentials')) {
//             errorMessage = 'Invalid email or password. Please try again.';
//         } else if (error.message.includes('User already registered')) {
//             errorMessage = 'An account with this email already exists. Please sign in instead.';
//         } else if (error.message.includes('Email not confirmed')) {
//             errorMessage = 'Please check your email and click the confirmation link before signing in.';
//         } else if (error.message.includes('Password should be at least 6 characters')) {
//             errorMessage = 'Password should be at least 6 characters long.';
//         } else if (error.message.includes('Invalid email')) {
//             errorMessage = 'Please enter a valid email address.';
//         } else {
//             errorMessage = error.message || errorMessage;
//         }
        
//         showErrorMessage(errorMessage);
//     } finally {
//         submitButton.textContent = originalText;
//         submitButton.disabled = false;
//     }
// }

// function showErrorMessage(message) {
//     const errorHTML = `
//         <div class="error-toast" id="errorToast">
//             <div class="error-content">
//                 <span class="error-icon">⚠️</span>
//                 <span class="error-message">${message}</span>
//             </div>
//         </div>
//     `;
    
//     document.body.insertAdjacentHTML('beforeend', errorHTML);
    
//     setTimeout(() => {
//         const toast = document.getElementById('errorToast');
//         if (toast) {
//             toast.classList.add('fade-out');
//             setTimeout(() => toast.remove(), 300);
//         }
//     }, 4000);
// }

// function addUserMenuStyles() {
//     if (document.getElementById('userMenuStyles')) return;
    
//     const styles = `
//         <style id="userMenuStyles">
//         .user-menu {
//             position: relative;
//         }
        
//         .user-dropdown {
//             position: relative;
//         }
        
//         .user-button {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 8px 12px;
//             background: transparent;
//             border: 1px solid #e2e8f0;
//             border-radius: 8px;
//             cursor: pointer;
//             transition: all 0.3s ease;
//             font-size: 14px;
//         }
        
//         .user-button:hover {
//             background: #f8fafc;
//             border-color: #6366f1;
//         }
        
//         .user-avatar {
//             width: 24px;
//             height: 24px;
//             background: #6366f1;
//             color: white;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 12px;
//             font-weight: 600;
//         }
        
//         .user-email {
//             max-width: 120px;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             white-space: nowrap;
//             color: #64748b;
//         }
        
//         .dropdown-menu {
//             position: absolute;
//             top: 100%;
//             right: 0;
//             background: white;
//             border: 1px solid #e2e8f0;
//             border-radius: 8px;
//             box-shadow: 0 4px 24px rgba(30, 41, 59, 0.08);
//             min-width: 180px;
//             padding: 8px 0;
//             display: none;
//             z-index: 1000;
//         }
        
//         .user-dropdown:hover .dropdown-menu {
//             display: block;
//         }
        
//         .dropdown-item {
//             display: block;
//             width: 100%;
//             padding: 8px 16px;
//             color: #64748b;
//             text-decoration: none;
//             background: none;
//             border: none;
//             text-align: left;
//             cursor: pointer;
//             font-size: 14px;
//             transition: all 0.3s ease;
//         }
        
//         .dropdown-item:hover {
//             background: #f8fafc;
//             color: #1e293b;
//         }
        
//         .dropdown-divider {
//             height: 1px;
//             background: #e2e8f0;
//             border: none;
//             margin: 4px 0;
//         }
        
//         .error-toast {
//             position: fixed;
//             top: 20px;
//             right: 20px;
//             background: linear-gradient(135deg, #ef4444, #dc2626);
//             color: white;
//             padding: 16px 24px;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
//             z-index: 10001;
//             animation: slideInRight 0.3s ease;
//         }
        
//         .error-toast.fade-out {
//             animation: slideOutRight 0.3s ease;
//         }
        
//         .error-content {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//         }
        
//         .error-icon {
//             font-size: 1.2rem;
//         }
//         </style>
//     `;
    
//     document.head.insertAdjacentHTML('beforeend', styles);
// }

// function showSuccessMessage(message) {
//     const successHTML = `
//         <div class="success-toast" id="successToast">
//             <div class="success-content">
//                 <span class="success-icon">✓</span>
//                 <span class="success-message">${message}</span>
//             </div>
//         </div>
//     `;
    
//     document.body.insertAdjacentHTML('beforeend', successHTML);
    
//     setTimeout(() => {
//         const toast = document.getElementById('successToast');
//         if (toast) {
//             toast.classList.add('fade-out');
//             setTimeout(() => toast.remove(), 300);
//         }
//     }, 3000);
// }

// function addAuthModalStyles() {
//     if (document.getElementById('authModalStyles')) return;
    
//     const styles = `
//         <style id="authModalStyles">
//         .auth-modal-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.8);
//             backdrop-filter: blur(5px);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 10000;
//             animation: fadeIn 0.3s ease;
//         }
        
//         .auth-modal-overlay.closing {
//             animation: fadeOut 0.3s ease;
//         }
        
//         .auth-modal {
//             background: white;
//             border-radius: 16px;
//             box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
//             max-width: 400px;
//             width: 90%;
//             max-height: 90vh;
//             overflow-y: auto;
//             animation: slideUp 0.3s ease;
//         }
        
//         .auth-modal-header {
//             padding: 2rem 2rem 0;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//         }
        
//         .auth-modal-header h2 {
//             margin: 0;
//             color: #1a202c;
//             font-size: 1.5rem;
//             font-weight: 700;
//         }
        
//         .close-modal {
//             background: none;
//             border: none;
//             font-size: 2rem;
//             color: #666;
//             cursor: pointer;
//             padding: 0;
//             width: 30px;
//             height: 30px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border-radius: 50%;
//             transition: all 0.3s ease;
//         }
        
//         .close-modal:hover {
//             background: #f5f5f5;
//             color: #1a202c;
//         }
        
//         .auth-modal-body {
//             padding: 1rem 2rem 2rem;
//         }
        
//         .auth-form {
//             margin-bottom: 1.5rem;
//         }
        
//         .form-group {
//             margin-bottom: 1.5rem;
//         }
        
//         .form-group label {
//             display: block;
//             margin-bottom: 0.5rem;
//             color: #2d3748;
//             font-weight: 600;
//             font-size: 14px;
//         }
        
//         .form-group input {
//             width: 100%;
//             padding: 12px 16px;
//             border: 2px solid #e2e8f0;
//             border-radius: 12px;
//             font-size: 16px;
//             transition: all 0.3s ease;
//             box-sizing: border-box;
//             background: #f8f9fa;
//         }
        
//         .form-group input:focus {
//             outline: none;
//             border-color: #ff6b6b;
//             box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
//             background: white;
//         }
        
//         .btn-full {
//             width: 100%;
//             margin-top: 1rem;
//         }
        
//         .auth-divider {
//             text-align: center;
//             margin: 1.5rem 0;
//             position: relative;
//         }
        
//         .auth-divider::before {
//             content: '';
//             position: absolute;
//             top: 50%;
//             left: 0;
//             right: 0;
//             height: 1px;
//             background: #e2e8f0;
//         }
        
//         .auth-divider span {
//             background: white;
//             padding: 0 1rem;
//             color: #666;
//             font-size: 14px;
//         }
        
//         .auth-switch {
//             text-align: center;
//         }
        
//         .auth-switch p {
//             margin: 0;
//             color: #666;
//             font-size: 14px;
//         }
        
//         .auth-switch a {
//             color: #ff6b6b;
//             text-decoration: none;
//             font-weight: 600;
//         }
        
//         .auth-switch a:hover {
//             text-decoration: underline;
//         }
        
//         .success-toast {
//             position: fixed;
//             top: 20px;
//             right: 20px;
//             background: linear-gradient(135deg, #10b981, #34d399);
//             color: white;
//             padding: 16px 24px;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
//             z-index: 10001;
//             animation: slideInRight 0.3s ease;
//         }
        
//         .success-toast.fade-out {
//             animation: slideOutRight 0.3s ease;
//         }
        
//         .success-content {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//         }
        
//         .success-icon {
//             font-size: 1.2rem;
//             font-weight: bold;
//         }
        
//         @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//         }
        
//         @keyframes fadeOut {
//             from { opacity: 1; }
//             to { opacity: 0; }
//         }
        
//         @keyframes slideUp {
//             from { 
//                 opacity: 0;
//                 transform: translateY(30px);
//             }
//             to { 
//                 opacity: 1;
//                 transform: translateY(0);
//             }
//         }
        
//         @keyframes slideInRight {
//             from {
//                 opacity: 0;
//                 transform: translateX(100%);
//             }
//             to {
//                 opacity: 1;
//                 transform: translateX(0);
//             }
//         }
        
//         @keyframes slideOutRight {
//             from {
//                 opacity: 1;
//                 transform: translateX(0);
//             }
//             to {
//                 opacity: 0;
//                 transform: translateX(100%);
//             }
//         }
        
//         @media (max-width: 480px) {
//             .auth-modal {
//                 margin: 1rem;
//                 width: calc(100% - 2rem);
//             }
            
//             .auth-modal-header,
//             .auth-modal-body {
//                 padding-left: 1.5rem;
//                 padding-right: 1.5rem;
//             }
//         }
//         </style>
//     `;
    
//     document.head.insertAdjacentHTML('beforeend', styles);
// }
