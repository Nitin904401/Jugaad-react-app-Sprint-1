import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="container">
            <div className="navbar-content">
              <div className="logo-section">
                <div className="logo">
                  <span className="logo-icon">⚙️</span>
                  <div className="logo-text">
                    <h1>AutoHub</h1>
                    <p>Spare Parts Online</p>
                  </div>
                </div>
              </div>

              <div className="search-bar-header">
                <input 
                  type="text" 
                  placeholder="Search parts, brands, cars..."
                  className="search-input"
                />
                <button className="search-btn">🔍</button>
              </div>

              <div className="header-actions">
                <button className="icon-btn">
                  <span>❤️</span>
                  <small>Wishlist</small>
                </button>
                <button className="icon-btn">
                  <span>🛒</span>
                  <small>Cart</small>
                </button>
                <button className="icon-btn">
                  <span>👤</span>
                  <small>Account</small>
                </button>
              </div>

              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        <nav className={`navbar-bottom ${isMenuOpen ? 'active' : ''}`}>
          <div className="container">
            <div className="nav-content">
              <button className="category-btn">
                <span>☰</span> Categories
              </button>
              <ul className="nav-menu">
                <li><a href="#engine">Engine Parts</a></li>
                <li><a href="#suspension">Suspension</a></li>
                <li><a href="#brakes">Brakes</a></li>
                <li><a href="#lighting">Lighting</a></li>
                <li><a href="#filters">Filters</a></li>
                <li><a href="#interior">Interiors</a></li>
                <li><a href="#wheels">Wheels & Tyres</a></li>
                <li><a href="#accessories">Accessories</a></li>
              </ul>
              <button className="vendor-btn">Become a Seller</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
