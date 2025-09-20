// Simple Parent Dashboard - Beginner Friendly
// This is easy to understand and modify

// Global variables to store data
let currentParent = null;
let childData = null;

// When page loads, get the parent and child data
function initializeParentDashboard() {
    // Get parent email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const parentEmail = urlParams.get('user');
    
    if (parentEmail && window.authDB) {
        // Find parent in database
        currentParent = window.authDB.getUserByEmail(parentEmail);
        
        if (currentParent) {
            // Find child linked to this parent
            childData = window.authDB.getStudentByParentEmail(parentEmail);
            
            // Update the dashboard with real data
            updateParentDashboard();
        }
    }
}

// Update the dashboard with current data
function updateParentDashboard() {
    if (!currentParent || !childData) return;
    
    // Update parent name
    const welcomeElement = document.getElementById('parent-welcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${currentParent.full_name}!`;
    }
    
    // Update child name
    const childNameElement = document.querySelector('.child-details h3');
    if (childNameElement && childData) {
        childNameElement.textContent = childData.full_name;
    }
    
    // Update payment status
    updatePaymentDisplay();
    
    // Update recent activities
    updateRecentActivities();
}

// Show current payment status
function updatePaymentDisplay() {
    const paymentStatus = document.querySelector('.payment-status-badge');
    const paymentAmount = document.querySelector('.payment-amount');
    
    if (childData) {
        // Check if payment is made
        const isPaid = childData.payment_status === 'paid';
        
        console.log('Updating payment display:', childData.payment_status, isPaid);
        
        if (paymentStatus) {
            if (isPaid) {
                paymentStatus.textContent = 'Paid';
                paymentStatus.className = 'payment-status-badge paid';
                paymentStatus.style.backgroundColor = '#28a745'; // Green for paid
            } else {
                paymentStatus.textContent = 'Pending';
                paymentStatus.className = 'payment-status-badge pending';
                paymentStatus.style.backgroundColor = '#ffc107'; // Yellow for pending
            }
        }
        
        if (paymentAmount) {
            const amount = childData.payment_amount || '156.00';
            paymentAmount.textContent = `R ${amount}`;
        }
        
        // Also update any other payment buttons
        const paymentBtn = document.querySelector('.payment-btn');
        if (paymentBtn && isPaid) {
            paymentBtn.textContent = 'Payment Complete';
            paymentBtn.style.backgroundColor = '#28a745';
            paymentBtn.disabled = true;
        }
    }
}

// Update recent activities list
function updateRecentActivities() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList || !childData) return;
    
    // Get activities from child data or use default
    let activities = childData.activities || [
        { icon: '📝', text: 'Math assignment submitted', time: '2 hours ago' },
        { icon: '🏆', text: 'Earned "Problem Solver" badge', time: '1 day ago' },
        { icon: '📊', text: 'Progress report updated', time: '3 days ago' },
        { icon: '💬', text: 'Teacher message received', time: '1 week ago' }
    ];
    
    // Show activities in HTML
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <small>${activity.time}</small>
            </div>
        </div>
    `).join('');
}

// Simple function to make a payment
function makePayment() {
    if (!childData) {
        alert('No child data found');
        return;
    }
    
    // Ask for confirmation
    if (confirm('Make payment of R 156.00?')) {
        // Update payment status in database
        if (window.authDB) {
            // Update child's payment status
            childData.payment_status = 'paid';
            childData.payment_amount = '156.00';
            
            // Add new activity
            if (!childData.activities) {
                childData.activities = [];
            }
            
            childData.activities.unshift({
                icon: '💰',
                text: 'Payment made successfully',
                time: 'Just now'
            });
            
            // Force refresh the entire dashboard
            setTimeout(() => {
                updateParentDashboard();
            }, 100);
        }
    }
}

// Simple function to contact teacher
function contactTeacher() {
    if (!childData) {
        alert('No child data found');
        return;
    }
    
    // Create a simple contact form
    const teacherEmail = 'teacher@empirasglobalacademy.com'; // Default teacher email
    const subject = `Message from ${currentParent.full_name} - ${childData.full_name}`;
    const message = prompt('Enter your message to the teacher:');
    
    if (message) {
        // In a real app, this would send an email
        // For now, we'll add it as an activity
        if (!childData.activities) {
            childData.activities = [];
        }
        
        childData.activities.unshift({
            icon: '💬',
            text: `Message sent to teacher: "${message.substring(0, 50)}..."`,
            time: 'Just now'
        });
        
        // Update the dashboard
        updateRecentActivities();
        
        // Show success (console only, no popup)
        console.log('Message sent to teacher:', message);
    }
}

// Simple function to view child profile
function viewChildProfile() {
    if (childData) {
        alert(`Child Profile:\n\nName: ${childData.full_name}\nGrade: ${childData.current_grade}\nEmail: ${childData.email}\nLocation: ${childData.location}`);
    } else {
        alert('No child data available');
    }
}

// Simple function to view reports
function viewChildReports() {
    alert('Academic Reports would show here.\nThis would display detailed progress reports.');
}

// Start the dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeParentDashboard();
});
