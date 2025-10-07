import React from 'react';
import '../styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Pathfinder Vanguard</h3>
                        <p>Empowering students worldwide with personalized learning paths and global community support.</p>
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
                    </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Pathfinder Vanguard. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


