// Payment API Simulation - Backend Integration
class PaymentAPI {
    constructor() {
        this.baseUrl = 'https://api.empiras-vanguard.co.za';
        this.apiKey = 'empiras_api_key_2024'; // Replace with actual API key
        
        // Simulated database
        this.payments = new Map();
        this.students = new Map();
        this.terms = new Map();
        
        this.initializeData();
    }

    initializeData() {
        // Initialize sample data
        this.students.set('ST2024001', {
            id: 'ST2024001',
            name: 'Thabo Mthembu',
            grade: 10,
            parentName: 'Mrs. Mthembu',
            email: 'thabo.mthembu@student.empiras-vanguard.co.za',
            phone: '+27 82 123 4567',
            paymentStatus: {
                term1: 'paid',
                term2: 'paid',
                term3: 'overdue',
                term4: 'pending'
            }
        });

        this.terms.set('term3', {
            id: 'term3',
            name: 'Term 3',
            period: 'July 8 - September 20, 2025',
            amount: 1750,
            dueDate: '2025-07-03',
            status: 'overdue'
        });

        this.terms.set('term4', {
            id: 'term4',
            name: 'Term 4',
            period: 'October 7 - December 6, 2025',
            amount: 1750,
            dueDate: '2025-10-02',
            status: 'pending'
        });
    }

    // Simulate API calls
    async makeAPICall(endpoint, method = 'GET', data = null) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        // Simulate API responses
        switch (endpoint) {
            case '/api/payments/create-intent':
                return this.createPaymentIntent(data);
            case '/api/payments/create-eft':
                return this.createEFTPayment(data);
            case '/api/payments/create-snapscan':
                return this.createSnapScanPayment(data);
            case '/api/payments/create-zapper':
                return this.createZapperPayment(data);
            case '/api/payments/create-cash':
                return this.createCashPayment(data);
            case '/api/payments/status':
                return this.getPaymentStatus(data);
            case '/api/payments/confirm':
                return this.confirmPayment(data);
            case '/api/payments/send-confirmation':
                return this.sendPaymentConfirmation(data);
            case '/api/students/update-access':
                return this.updateStudentAccess(data);
            default:
                throw new Error('API endpoint not found');
        }
    }

    async createPaymentIntent(data) {
        const paymentId = 'pi_' + Math.random().toString(36).substr(2, 9);
        const clientSecret = 'pi_' + Math.random().toString(36).substr(2, 9) + '_secret_' + Math.random().toString(36).substr(2, 9);
        
        // Store payment intent
        this.payments.set(paymentId, {
            id: paymentId,
            clientSecret: clientSecret,
            amount: data.amount,
            currency: data.currency,
            studentId: data.studentId,
            termId: data.termId,
            status: 'requires_payment_method',
            created: new Date().toISOString()
        });

        return {
            clientSecret: clientSecret,
            paymentIntentId: paymentId
        };
    }

    async createEFTPayment(data) {
        const paymentId = 'eft_' + Math.random().toString(36).substr(2, 9);
        
        // Store EFT payment
        this.payments.set(paymentId, {
            id: paymentId,
            type: 'eft',
            amount: data.amount,
            currency: data.currency,
            studentId: data.studentId,
            termId: data.termId,
            status: 'pending',
            created: new Date().toISOString(),
            eftDetails: data.eftDetails
        });

        return {
            paymentId: paymentId,
            status: 'pending'
        };
    }

    async createSnapScanPayment(data) {
        const paymentId = 'snap_' + Math.random().toString(36).substr(2, 9);
        
        // Store SnapScan payment
        this.payments.set(paymentId, {
            id: paymentId,
            type: 'snapscan',
            amount: data.amount,
            currency: data.currency,
            studentId: data.studentId,
            termId: data.termId,
            status: 'pending',
            created: new Date().toISOString()
        });

        return {
            paymentId: paymentId,
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // Placeholder QR code
            snapscanUrl: `https://snapscan.co.za/pay/${paymentId}`
        };
    }

    async createZapperPayment(data) {
        const paymentId = 'zap_' + Math.random().toString(36).substr(2, 9);
        
        // Store Zapper payment
        this.payments.set(paymentId, {
            id: paymentId,
            type: 'zapper',
            amount: data.amount,
            currency: data.currency,
            studentId: data.studentId,
            termId: data.termId,
            status: 'pending',
            created: new Date().toISOString()
        });

        return {
            paymentId: paymentId,
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', // Placeholder QR code
            zapperUrl: `https://zapper.com/pay/${paymentId}`
        };
    }

    async createCashPayment(data) {
        const paymentId = 'cash_' + Math.random().toString(36).substr(2, 9);
        
        // Store cash payment
        this.payments.set(paymentId, {
            id: paymentId,
            type: 'cash',
            amount: data.amount,
            currency: data.currency,
            studentId: data.studentId,
            termId: data.termId,
            status: 'pending',
            created: new Date().toISOString(),
            instructions: data.instructions
        });

        return {
            paymentId: paymentId,
            status: 'pending'
        };
    }

    async getPaymentStatus(paymentId) {
        const payment = this.payments.get(paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }

        // Simulate payment status updates
        if (payment.status === 'pending' && Math.random() > 0.7) {
            payment.status = 'completed';
            payment.completed = new Date().toISOString();
        }

        return {
            status: payment.status,
            paymentId: paymentId
        };
    }

    async confirmPayment(data) {
        const payment = this.payments.get(data.paymentId);
        if (!payment) {
            throw new Error('Payment not found');
        }

        // Update payment status
        payment.status = 'completed';
        payment.completed = new Date().toISOString();
        payment.transactionId = data.paymentId;

        // Update student payment status
        const student = this.students.get(data.studentId);
        if (student) {
            student.paymentStatus[data.termId] = 'paid';
        }

        return {
            success: true,
            paymentId: data.paymentId,
            status: 'completed'
        };
    }

    async sendPaymentConfirmation(data) {
        // Simulate sending confirmation email
        console.log(`Sending payment confirmation email to ${data.customerEmail}`);
        
        return {
            success: true,
            message: 'Confirmation email sent'
        };
    }

    async updateStudentAccess(data) {
        const student = this.students.get(data.studentId);
        if (student) {
            // Update access restrictions
            student.accessRestrictions = false;
            student.lastAccessUpdate = new Date().toISOString();
        }

        return {
            success: true,
            accessRestrictions: false
        };
    }

    // Utility methods
    getStudent(studentId) {
        return this.students.get(studentId);
    }

    getTerm(termId) {
        return this.terms.get(termId);
    }

    getPayment(paymentId) {
        return this.payments.get(paymentId);
    }

    getAllPayments() {
        return Array.from(this.payments.values());
    }

    // Simulate webhook for payment status updates
    simulateWebhook(paymentId, status) {
        const payment = this.payments.get(paymentId);
        if (payment) {
            payment.status = status;
            if (status === 'completed') {
                payment.completed = new Date().toISOString();
            }
        }
    }

    // Simulate payment processing delay
    async simulatePaymentProcessing(paymentId, delay = 5000) {
        setTimeout(() => {
            this.simulateWebhook(paymentId, 'completed');
        }, delay);
    }
}

// Initialize payment API
window.paymentAPI = new PaymentAPI();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentAPI;
}

