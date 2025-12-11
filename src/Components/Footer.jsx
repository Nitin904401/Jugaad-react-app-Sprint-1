import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h4>About AutoHub</h4>
              <p>Your trusted online marketplace for genuine auto spare parts. Quality guaranteed, Prices competitive.</p>
              <div className="social-links">
                <a href="#" title="Facebook">f</a>
                <a href="#" title="Instagram">📷</a>
                <a href="#" title="Twitter">𝕏</a>
                <a href="#" title="LinkedIn">in</a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Shop</h4>
              <ul>
                <li><a href="#parts">All Parts</a></li>
                <li><a href="#brands">Top Brands</a></li>
                <li><a href="#cars">By Car Make</a></li>
                <li><a href="#offers">Best Offers</a></li>
                <li><a href="#new">New Arrivals</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">FAQs</a></li>
                <li><a href="#track">Track Order</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#warranty">Warranty Info</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
                <li><a href="#partnerships">Partnerships</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#shipping">Shipping Policy</a></li>
                <li><a href="#refund">Refund Policy</a></li>
                <li><a href="#disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; 2024 AutoHub. All rights reserved.</p>
            <div className="payment-methods">
              <span>We Accept:</span>
              <span className="payment-icons">💳 UPI 🏦 Bank Transfer 📱 Digital Wallets</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
