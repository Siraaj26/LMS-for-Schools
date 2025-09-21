// Payment Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardFields = document.getElementById('cardFields');
    const eftFields = document.getElementById('eftFields');
    const mobileFields = document.getElementById('mobileFields');
    const processingFeeElement = document.getElementById('processingFee');
    const totalAmountElement = document.getElementById('totalAmount');
    const amountInput = document.getElementById('amount');

    // Payment method selection handler
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Remove selected class from all methods
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            
            // Add selected class to current method
            this.closest('.payment-method').classList.add('selected');
            
            // Hide all field sections
            cardFields.classList.remove('active');
            eftFields.classList.remove('active');
            mobileFields.classList.remove('active');
            
            // Show relevant field section and update processing fee
            switch(this.value) {
                case 'stripe':
                    cardFields.classList.add('active');
                    updateProcessingFee(0.029); // 2.9%
                    break;
                case 'eft':
                    eftFields.classList.add('active');
                    updateProcessingFee(0.00);
                    break;
                case 'snapscan':
                case 'zapper':
                    mobileFields.classList.add('active');
                    updateProcessingFee(0.025); // 2.5%
                    break;
                case 'cash':
                    updateProcessingFee(0.00);
                    break;
            }
        });
    });

    // Update processing fee calculation
    function updateProcessingFee(rate) {
        const amount = parseFloat(amountInput.value) || 0;
        const processingFee = amount * rate;
        const total = amount + processingFee;
        
        processingFeeElement.textContent = `R ${processingFee.toFixed(2)}`;
        totalAmountElement.textContent = `R ${total.toFixed(2)}`;
    }

    // Update processing fee when amount changes
    amountInput.addEventListener('input', function() {
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
        if (selectedMethod) {
            const rate = selectedMethod.value === 'stripe' ? 0.029 : 
                        (selectedMethod.value === 'snapscan' || selectedMethod.value === 'zapper') ? 0.025 : 0.00;
            updateProcessingFee(rate);
        }
    });

    // Initialize Stripe Elements when Stripe is selected
    document.getElementById('stripe').addEventListener('change', function() {
        if (this.checked && window.Stripe) {
            initializeStripeElements();
        }
    });

    // Initialize Stripe Elements
    function initializeStripeElements() {
        if (window.Stripe && window.paymentProcessor) {
            const stripe = window.paymentProcessor.stripe;
            const elements = stripe.elements();
            const cardElement = elements.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                },
            });
            cardElement.mount('#card-element');
        }
    }

    // Form validation
    const form = document.getElementById('paymentForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            // Process payment
            if (window.paymentProcessor) {
                window.paymentProcessor.handlePaymentSubmission(form);
            }
        }
    });

    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                field.style.borderColor = '#e2e8f0';
            }
        });

        // Validate email
        const emailField = document.getElementById('student-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#e53e3e';
            isValid = false;
        }

        // Validate phone
        const phoneField = document.getElementById('student-phone');
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (phoneField.value && !phoneRegex.test(phoneField.value)) {
            phoneField.style.borderColor = '#e53e3e';
            isValid = false;
        }

        // Validate amount
        const amount = parseFloat(amountInput.value);
        if (amount <= 0) {
            amountInput.style.borderColor = '#e53e3e';
            isValid = false;
        }

        if (!isValid) {
            showValidationError('Please fill in all required fields correctly.');
        }

        return isValid;
    }

    function showValidationError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert error message at the top of the form
        const form = document.getElementById('paymentForm');
        form.insertBefore(errorDiv, form.firstChild);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }

    // Auto-update description based on term selection
    const termSelect = document.getElementById('term');
    const descriptionTextarea = document.getElementById('description');
    
    termSelect.addEventListener('change', function() {
        const termText = this.options[this.selectedIndex].text;
        descriptionTextarea.value = `School fees payment for ${termText}`;
    });

    // Initialize with default values
    updateProcessingFee(0.00);
});

