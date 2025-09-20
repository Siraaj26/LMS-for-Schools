// Payment Test JavaScript
// Handles payment testing functionality for South African context

class PaymentTest {
    constructor() {
        this.testResults = [];
        this.currentTest = null;
        this.testCards = {
            '4242424242424242': {
                description: 'Successful Payment',
                icon: '💳',
                expectedResult: 'success'
            },
            '4000000000000002': {
                description: 'Insufficient Funds',
                icon: '❌',
                expectedResult: 'failed'
            },
            '4000000000003220': {
                description: '3D Secure Required',
                icon: '🔐',
                expectedResult: '3d_secure'
            },
            '4000000000009995': {
                description: 'Declined Card',
                icon: '🚫',
                expectedResult: 'declined'
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTestScenario('successful-payment');
        this.log('Payment test system initialized');
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('test-payment-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Card number formatting
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => this.formatCardNumber(e));
        }

        // Expiry date formatting
        const expiryInput = document.getElementById('expiry-date');
        if (expiryInput) {
            expiryInput.addEventListener('input', (e) => this.formatExpiryDate(e));
        }

        // CVV formatting
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => this.formatCVV(e));
        }
    }

    loadTestScenario(scenario) {
        const scenarioSelect = document.getElementById('test-scenario');
        if (scenarioSelect) {
            scenarioSelect.value = scenario;
        }

        switch (scenario) {
            case 'successful-payment':
                this.setupSuccessfulPaymentTest();
                break;
            case 'failed-payment':
                this.setupFailedPaymentTest();
                break;
            case 'insufficient-funds':
                this.setupInsufficientFundsTest();
                break;
            case '3d-secure':
                this.setup3DSecureTest();
                break;
            case 'eft-payment':
                this.setupEFTPaymentTest();
                break;
            case 'overdue-payment':
                this.setupOverduePaymentTest();
                break;
        }
    }

    setupSuccessfulPaymentTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded successful payment test scenario');
    }

    setupFailedPaymentTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded failed payment test scenario');
    }

    setupInsufficientFundsTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded insufficient funds test scenario');
    }

    setup3DSecureTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded 3D Secure test scenario');
    }

    setupEFTPaymentTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded EFT payment test scenario');
    }

    setupOverduePaymentTest() {
        this.updateTestData({
            studentName: 'Thabo Mthembu',
            studentId: 'ST2024001',
            schoolName: 'Johannesburg High School',
            paymentAmount: 'R 156.00',
            paymentCurrency: 'ZAR',
            paymentReference: 'ST2024001-2024Q1'
        });
        this.log('Loaded overdue payment test scenario');
    }

    updateTestData(data) {
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = data[key];
            }
        });
    }

    runTest() {
        const scenario = document.getElementById('test-scenario').value;
        this.log(`Running test: ${scenario}`);
        
        this.setTestStatus('Running...');
        
        // Simulate test execution
        setTimeout(() => {
            this.executeTest(scenario);
        }, 1000);
    }

    executeTest(scenario) {
        const testResult = {
            id: Date.now(),
            scenario: scenario,
            timestamp: new Date(),
            status: 'running'
        };

        this.currentTest = testResult;
        this.addTestResult(testResult);

        // Simulate test execution based on scenario
        switch (scenario) {
            case 'successful-payment':
                this.simulateSuccessfulPayment();
                break;
            case 'failed-payment':
                this.simulateFailedPayment();
                break;
            case 'insufficient-funds':
                this.simulateInsufficientFunds();
                break;
            case '3d-secure':
                this.simulate3DSecure();
                break;
            case 'eft-payment':
                this.simulateEFTPayment();
                break;
            case 'overdue-payment':
                this.simulateOverduePayment();
                break;
        }
    }

    simulateSuccessfulPayment() {
        this.log('Processing payment with test card 4242424242424242');
        this.log('Validating card details...');
        this.log('Checking available funds...');
        this.log('Processing payment...');
        
        setTimeout(() => {
            this.completeTest({
                status: 'success',
                message: 'Payment processed successfully',
                details: {
                    transactionId: 'TXN_' + Date.now(),
                    amount: 'R 156.00',
                    currency: 'ZAR',
                    method: 'Credit Card',
                    cardLast4: '4242'
                }
            });
        }, 2000);
    }

    simulateFailedPayment() {
        this.log('Processing payment with test card 4000000000000002');
        this.log('Validating card details...');
        this.log('Checking available funds...');
        this.log('Payment declined by bank');
        
        setTimeout(() => {
            this.completeTest({
                status: 'failed',
                message: 'Payment was declined',
                details: {
                    errorCode: 'card_declined',
                    errorMessage: 'Your card was declined',
                    amount: 'R 156.00',
                    currency: 'ZAR'
                }
            });
        }, 2000);
    }

    simulateInsufficientFunds() {
        this.log('Processing payment with test card 4000000000000002');
        this.log('Validating card details...');
        this.log('Checking available funds...');
        this.log('Insufficient funds available');
        
        setTimeout(() => {
            this.completeTest({
                status: 'failed',
                message: 'Insufficient funds',
                details: {
                    errorCode: 'insufficient_funds',
                    errorMessage: 'Your card has insufficient funds',
                    amount: 'R 156.00',
                    currency: 'ZAR'
                }
            });
        }, 2000);
    }

    simulate3DSecure() {
        this.log('Processing payment with test card 4000000000003220');
        this.log('Validating card details...');
        this.log('3D Secure authentication required');
        this.log('Redirecting to 3D Secure...');
        
        setTimeout(() => {
            this.completeTest({
                status: '3d_secure',
                message: '3D Secure authentication required',
                details: {
                    requiresAction: true,
                    actionUrl: 'https://3dsecure.example.com/auth',
                    amount: 'R 156.00',
                    currency: 'ZAR'
                }
            });
        }, 2000);
    }

    simulateEFTPayment() {
        this.log('Processing EFT payment');
        this.log('Generating bank details...');
        this.log('Creating payment reference...');
        this.log('EFT payment initiated');
        
        setTimeout(() => {
            this.completeTest({
                status: 'pending',
                message: 'EFT payment initiated',
                details: {
                    bankDetails: {
                        bank: 'Standard Bank',
                        accountName: 'Empiras Vanguard School',
                        accountNumber: '1234567890',
                        branchCode: '051001',
                        reference: 'ST2024001-2024Q1'
                    },
                    amount: 'R 156.00',
                    currency: 'ZAR'
                }
            });
        }, 2000);
    }

    simulateOverduePayment() {
        this.log('Checking payment status...');
        this.log('Payment is overdue');
        this.log('Applying late payment fee...');
        this.log('Blocking access to dashboard...');
        
        setTimeout(() => {
            this.completeTest({
                status: 'overdue',
                message: 'Payment is overdue - access restricted',
                details: {
                    originalAmount: 'R 150.00',
                    lateFee: 'R 6.00',
                    totalAmount: 'R 156.00',
                    dueDate: '2024-03-31',
                    daysOverdue: 5,
                    accessBlocked: true
                }
            });
        }, 2000);
    }

    completeTest(result) {
        if (this.currentTest) {
            this.currentTest.status = result.status;
            this.currentTest.message = result.message;
            this.currentTest.details = result.details;
            this.currentTest.completedAt = new Date();
            
            this.updateTestResult(this.currentTest);
            this.log(`Test completed: ${result.status}`);
            
            if (result.status === 'success') {
                this.setTestStatus('Success');
            } else if (result.status === 'failed') {
                this.setTestStatus('Failed');
            } else {
                this.setTestStatus('Completed');
            }
        }
    }

    addTestResult(result) {
        this.testResults.unshift(result);
        this.updateTestResultsDisplay();
    }

    updateTestResult(result) {
        const index = this.testResults.findIndex(r => r.id === result.id);
        if (index !== -1) {
            this.testResults[index] = result;
            this.updateTestResultsDisplay();
        }
    }

    updateTestResultsDisplay() {
        const resultsContainer = document.getElementById('test-results');
        if (!resultsContainer) return;

        if (this.testResults.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <span class="icon">🧪</span>
                    <p>No tests run yet. Click "Run Test" to start testing.</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = this.testResults.map(result => `
            <div class="test-result ${result.status}">
                <h4>${this.getScenarioName(result.scenario)}</h4>
                <div class="result-details">
                    <p><strong>Status:</strong> ${result.status}</p>
                    <p><strong>Message:</strong> ${result.message}</p>
                    <p><strong>Time:</strong> ${result.timestamp.toLocaleTimeString()}</p>
                    ${result.details ? `
                        <details>
                            <summary>Details</summary>
                            <pre>${JSON.stringify(result.details, null, 2)}</pre>
                        </details>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getScenarioName(scenario) {
        const names = {
            'successful-payment': '✅ Successful Payment',
            'failed-payment': '❌ Failed Payment',
            'insufficient-funds': '💰 Insufficient Funds',
            '3d-secure': '🔐 3D Secure Required',
            'eft-payment': '🏦 EFT Payment',
            'overdue-payment': '⏰ Overdue Payment'
        };
        return names[scenario] || scenario;
    }

    setTestStatus(status) {
        const statusElement = document.getElementById('test-status');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `status-indicator ${status.toLowerCase().replace(' ', '-')}`;
        }
    }

    log(message) {
        const logContainer = document.getElementById('test-log');
        if (!logContainer) return;

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `
            <span class="timestamp">[${timestamp}]</span>
            <span class="message">${message}</span>
        `;
        
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    formatCardNumber(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    }

    formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }

    formatCVV(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value;
    }

    selectTestCard(cardNumber) {
        // Remove previous selection
        document.querySelectorAll('.test-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection to clicked card
        event.target.closest('.test-card').classList.add('selected');

        // Fill form with test card data
        document.getElementById('card-number').value = cardNumber.replace(/(.{4})/g, '$1 ').trim();
        document.getElementById('expiry-date').value = '12/25';
        document.getElementById('cvv').value = '123';
        document.getElementById('cardholder-name').value = 'Thabo Mthembu';
        document.getElementById('email').value = 'thabo.mthembu@example.com';

        this.log(`Selected test card: ${cardNumber}`);
    }

    fillTestData() {
        const scenario = document.getElementById('test-scenario').value;
        const selectedCard = document.querySelector('.test-card.selected');
        
        if (selectedCard) {
            const cardNumber = selectedCard.querySelector('.card-number').textContent.replace(/\s/g, '');
            this.selectTestCard(cardNumber);
        } else {
            // Fill with default test data
            document.getElementById('card-number').value = '4242 4242 4242 4242';
            document.getElementById('expiry-date').value = '12/25';
            document.getElementById('cvv').value = '123';
            document.getElementById('cardholder-name').value = 'Thabo Mthembu';
            document.getElementById('email').value = 'thabo.mthembu@example.com';
        }

        this.log('Test data filled');
    }

    handleFormSubmission(e) {
        e.preventDefault();
        this.log('Test payment form submitted');
        this.runTest();
    }

    resetTest() {
        this.testResults = [];
        this.currentTest = null;
        this.updateTestResultsDisplay();
        this.setTestStatus('Ready');
        this.log('Test system reset');
    }

    clearResults() {
        this.testResults = [];
        this.updateTestResultsDisplay();
        this.log('Test results cleared');
    }

    // Quick test functions
    testSuccessfulPayment() {
        this.loadTestScenario('successful-payment');
        this.selectTestCard('4242424242424242');
        this.runTest();
    }

    testFailedPayment() {
        this.loadTestScenario('failed-payment');
        this.selectTestCard('4000000000000002');
        this.runTest();
    }

    testEFTPayment() {
        this.loadTestScenario('eft-payment');
        this.runTest();
    }

    testPaymentGating() {
        this.loadTestScenario('overdue-payment');
        this.runTest();
    }
}

// Global functions for HTML onclick handlers
function loadTestScenario() {
    const scenario = document.getElementById('test-scenario').value;
    if (window.paymentTest) {
        window.paymentTest.loadTestScenario(scenario);
    }
}

function runTest() {
    if (window.paymentTest) {
        window.paymentTest.runTest();
    }
}

function resetTest() {
    if (window.paymentTest) {
        window.paymentTest.resetTest();
    }
}

function selectTestCard(cardNumber) {
    if (window.paymentTest) {
        window.paymentTest.selectTestCard(cardNumber);
    }
}

function fillTestData() {
    if (window.paymentTest) {
        window.paymentTest.fillTestData();
    }
}

function clearResults() {
    if (window.paymentTest) {
        window.paymentTest.clearResults();
    }
}

function testSuccessfulPayment() {
    if (window.paymentTest) {
        window.paymentTest.testSuccessfulPayment();
    }
}

function testFailedPayment() {
    if (window.paymentTest) {
        window.paymentTest.testFailedPayment();
    }
}

function testEFTPayment() {
    if (window.paymentTest) {
        window.paymentTest.testEFTPayment();
    }
}

function testPaymentGating() {
    if (window.paymentTest) {
        window.paymentTest.testPaymentGating();
    }
}

function closeTestResults() {
    const modal = document.getElementById('test-results-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialize payment test when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentTest = new PaymentTest();
});
