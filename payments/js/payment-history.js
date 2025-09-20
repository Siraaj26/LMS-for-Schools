// Payment History JavaScript
// Handles payment history display, filtering, and pagination

class PaymentHistory {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.paymentHistory = [];
        this.filteredHistory = [];
        this.totalPages = 1;
        
        this.init();
    }

    init() {
        this.loadPaymentData();
        this.setupEventListeners();
        this.updateHistory();
    }

    loadPaymentData() {
        // Load payment data from localStorage or API
        // For demo purposes, we'll use sample data
        this.paymentHistory = [
            {
                id: 'PAY001',
                date: '2024-03-15',
                reference: 'ST2024001-2024Q1',
                description: 'Term 1 Tuition Fee',
                amount: 15000, // R150.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456789',
                cardLast4: '4242'
            },
            {
                id: 'PAY002',
                date: '2024-02-28',
                reference: 'ST2024001-2024Q1',
                description: 'Activity Fee - Sports',
                amount: 500, // R5.00 in cents
                method: 'Bank Transfer',
                status: 'completed',
                transactionId: 'TXN123456790',
                bankReference: 'EFT123456'
            },
            {
                id: 'PAY003',
                date: '2024-01-15',
                reference: 'ST2024001-2023Q4',
                description: 'Term 4 Tuition Fee',
                amount: 15000, // R150.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456791',
                cardLast4: '5555'
            },
            {
                id: 'PAY004',
                date: '2024-03-20',
                reference: 'ST2024001-2024Q1',
                description: 'Late Payment Fee',
                amount: 100, // R1.00 in cents
                method: 'Credit Card',
                status: 'completed',
                transactionId: 'TXN123456792',
                cardLast4: '4242'
            },
            {
                id: 'PAY005',
                date: '2024-03-10',
                reference: 'ST2024001-2024Q1',
                description: 'Library Fee',
                amount: 200, // R2.00 in cents
                method: 'Bank Transfer',
                status: 'pending',
                transactionId: 'TXN123456793',
                bankReference: 'EFT123457'
            },
            {
                id: 'PAY006',
                date: '2024-02-15',
                reference: 'ST2024001-2023Q4',
                description: 'Exam Fee',
                amount: 300, // R3.00 in cents
                method: 'Credit Card',
                status: 'failed',
                transactionId: 'TXN123456794',
                cardLast4: '0000'
            },
            {
                id: 'PAY007',
                date: '2024-01-30',
                reference: 'ST2024001-2023Q4',
                description: 'Refund - Overpayment',
                amount: -500, // R5.00 refund in cents
                method: 'Bank Transfer',
                status: 'refunded',
                transactionId: 'TXN123456795',
                bankReference: 'REF123456'
            }
        ];

        this.filteredHistory = [...this.paymentHistory];
        this.calculateTotalPages();
    }

    setupEventListeners() {
        // Filter controls
        const dateFilter = document.getElementById('date-filter');
        const statusFilter = document.getElementById('status-filter');
        const searchInput = document.getElementById('search-input');

        if (dateFilter) {
            dateFilter.addEventListener('change', () => this.filterHistory());
        }

        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterHistory());
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.searchHistory());
        }

        // Pagination
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousPage());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextPage());
        }

        // Export functionality
        const exportBtn = document.querySelector('[onclick="exportHistory()"]');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportHistory());
        }

        // Make payment button
        const makePaymentBtn = document.querySelector('[onclick="goToPaymentForm()"]');
        if (makePaymentBtn) {
            makePaymentBtn.addEventListener('click', () => this.goToPaymentForm());
        }
    }

    filterHistory() {
        const dateFilter = document.getElementById('date-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const searchTerm = document.getElementById('search-input').value.toLowerCase();

        this.filteredHistory = this.paymentHistory.filter(payment => {
            // Date filter
            if (dateFilter !== 'all') {
                const paymentDate = new Date(payment.date);
                const now = new Date();
                
                switch (dateFilter) {
                    case 'this-year':
                        if (paymentDate.getFullYear() !== now.getFullYear()) return false;
                        break;
                    case 'this-term':
                        // Assuming current term is Q1 2024
                        if (paymentDate < new Date('2024-01-01') || paymentDate > new Date('2024-03-31')) return false;
                        break;
                    case 'last-3-months':
                        const threeMonthsAgo = new Date();
                        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                        if (paymentDate < threeMonthsAgo) return false;
                        break;
                    case 'last-month':
                        const oneMonthAgo = new Date();
                        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                        if (paymentDate < oneMonthAgo) return false;
                        break;
                }
            }

            // Status filter
            if (statusFilter !== 'all' && payment.status !== statusFilter) {
                return false;
            }

            // Search filter
            if (searchTerm) {
                const searchableText = [
                    payment.reference,
                    payment.description,
                    payment.transactionId,
                    this.formatZAR(payment.amount)
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(searchTerm)) return false;
            }

            return true;
        });

        this.currentPage = 1;
        this.calculateTotalPages();
        this.updateHistory();
    }

    searchHistory() {
        this.filterHistory();
    }

    calculateTotalPages() {
        this.totalPages = Math.ceil(this.filteredHistory.length / this.itemsPerPage);
    }

    updateHistory() {
        this.updateSummaryCards();
        this.updateHistoryTable();
        this.updatePagination();
        this.updateNoResultsMessage();
    }

    updateSummaryCards() {
        const totalPaid = document.getElementById('total-paid');
        const lastPayment = document.getElementById('last-payment');
        const nextDue = document.getElementById('next-due');

        // Calculate total paid (completed payments only)
        const completedPayments = this.paymentHistory.filter(p => p.status === 'completed');
        const totalPaidAmount = completedPayments.reduce((sum, p) => sum + p.amount, 0);

        if (totalPaid) {
            totalPaid.textContent = this.formatZAR(totalPaidAmount);
        }

        // Get last payment
        const lastPaymentData = completedPayments.length > 0 ? completedPayments[0] : null;
        if (lastPayment && lastPaymentData) {
            lastPayment.textContent = this.formatZAR(lastPaymentData.amount);
        }

        // Get next due amount
        const paymentStatus = localStorage.getItem('paymentStatus') || 'pending';
        const nextDueAmount = paymentStatus === 'paid' ? 0 : 15600; // R156.00 in cents
        
        if (nextDue) {
            nextDue.textContent = this.formatZAR(nextDueAmount);
        }
    }

    updateHistoryTable() {
        const tbody = document.getElementById('payment-history-tbody');
        if (!tbody) return;

        // Calculate pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredHistory.slice(startIndex, endIndex);

        tbody.innerHTML = pageData.map(payment => `
            <tr>
                <td>${this.formatDate(payment.date)}</td>
                <td>${payment.reference}</td>
                <td>${payment.description}</td>
                <td>${this.formatZAR(payment.amount)}</td>
                <td>${payment.method}</td>
                <td>
                    <span class="status-badge ${payment.status}">
                        ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                </td>
                <td>
                    <a href="#" class="action-link" onclick="paymentHistory.viewPaymentDetails('${payment.id}')">
                        View Details
                    </a>
                </td>
            </tr>
        `).join('');
    }

    updatePagination() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const pageNumbers = document.getElementById('page-numbers');

        // Update prev/next buttons
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === this.totalPages;
        }

        // Update page numbers
        if (pageNumbers) {
            let pageNumbersHTML = '';
            const maxVisiblePages = 5;
            let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbersHTML += `
                    <button class="page-number ${i === this.currentPage ? 'active' : ''}" 
                            onclick="paymentHistory.goToPage(${i})">
                        ${i}
                    </button>
                `;
            }

            pageNumbers.innerHTML = pageNumbersHTML;
        }
    }

    updateNoResultsMessage() {
        const noResults = document.getElementById('no-results');
        const tbody = document.getElementById('payment-history-tbody');
        
        if (noResults && tbody) {
            if (this.filteredHistory.length === 0) {
                noResults.style.display = 'block';
                tbody.style.display = 'none';
            } else {
                noResults.style.display = 'none';
                tbody.style.display = 'table-row-group';
            }
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateHistory();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateHistory();
        }
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updateHistory();
        }
    }

    viewPaymentDetails(paymentId) {
        const payment = this.paymentHistory.find(p => p.id === paymentId);
        if (!payment) return;

        const modal = document.getElementById('payment-details-modal');
        const content = document.getElementById('payment-details-content');

        if (modal && content) {
            content.innerHTML = `
                <div class="payment-detail-item">
                    <span class="detail-label">Transaction ID:</span>
                    <span class="detail-value">${payment.transactionId}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${this.formatDate(payment.date)}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Reference:</span>
                    <span class="detail-value">${payment.reference}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Description:</span>
                    <span class="detail-value">${payment.description}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Amount:</span>
                    <span class="detail-value">${this.formatZAR(payment.amount)}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value">${payment.method}</span>
                </div>
                <div class="payment-detail-item">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value">
                        <span class="status-badge ${payment.status}">
                            ${payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                    </span>
                </div>
                ${payment.cardLast4 ? `
                <div class="payment-detail-item">
                    <span class="detail-label">Card Last 4:</span>
                    <span class="detail-value">**** **** **** ${payment.cardLast4}</span>
                </div>
                ` : ''}
                ${payment.bankReference ? `
                <div class="payment-detail-item">
                    <span class="detail-label">Bank Reference:</span>
                    <span class="detail-value">${payment.bankReference}</span>
                </div>
                ` : ''}
            `;

            modal.style.display = 'block';
        }
    }

    exportHistory() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    downloadExport() {
        const format = document.querySelector('input[name="export-format"]:checked').value;
        
        // In a real app, this would generate the actual export file
        alert(`Exporting payment history as ${format.toUpperCase()}...`);
        
        // Close modal
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    goToPaymentForm() {
        window.location.href = 'payment_form.html';
    }

    closePaymentDetails() {
        const modal = document.getElementById('payment-details-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    closeExportModal() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    downloadReceipt() {
        // In a real app, this would generate and download a receipt
        alert('Receipt download functionality would be implemented here');
    }

    // Format South African Rand
    formatZAR(amountInCents) {
        const amount = amountInCents / 100;
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR'
        }).format(amount);
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-ZA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Global functions for HTML onclick handlers
function exportHistory() {
    if (window.paymentHistory) {
        window.paymentHistory.exportHistory();
    }
}

function goToPaymentForm() {
    if (window.paymentHistory) {
        window.paymentHistory.goToPaymentForm();
    }
}

function downloadReceipt() {
    if (window.paymentHistory) {
        window.paymentHistory.downloadReceipt();
    }
}

function closePaymentDetails() {
    if (window.paymentHistory) {
        window.paymentHistory.closePaymentDetails();
    }
}

function closeExportModal() {
    if (window.paymentHistory) {
        window.paymentHistory.closeExportModal();
    }
}

function downloadExport() {
    if (window.paymentHistory) {
        window.paymentHistory.downloadExport();
    }
}

function previousPage() {
    if (window.paymentHistory) {
        window.paymentHistory.previousPage();
    }
}

function nextPage() {
    if (window.paymentHistory) {
        window.paymentHistory.nextPage();
    }
}

function filterHistory() {
    if (window.paymentHistory) {
        window.paymentHistory.filterHistory();
    }
}

function searchHistory() {
    if (window.paymentHistory) {
        window.paymentHistory.searchHistory();
    }
}

// Initialize payment history when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentHistory = new PaymentHistory();
});
