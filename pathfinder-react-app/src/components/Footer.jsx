import React from 'react';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-links">
                <a href="https://www.instagram.com/empirasglobalacademy/?hl=en" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/empirasglobalacademy" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://x.com/empirasglobal/status/1962431564660531362" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/company/empiras/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2025 Pathfinder. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/cookies">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;


