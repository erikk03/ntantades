import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';


const HomePage = () => {
  return (
    <div>
      <header className="header">
        <h1>Neighborhood Nannies</h1>
        <nav className="nav">
          <Link to="/login" className="link">Login</Link>
          <Link to="/register" className="link">Register</Link>
          <Link to="/contact" className="link">Contact Us</Link>
        </nav>
      </header>

      <main className="main">
        <section className="announcement-section">
          <h2>Announcements</h2>
          <div className="announcement-box">
            <p>Important: New guidelines for nannies available now!</p>
          </div>
        </section>

        <section className="login-section">
          <h2>Get Started</h2>
          <div>
            <p>Are you a parent/guardian looking for a nanny?</p>
            <Link to="/login" className="button">Login via TAXISNET</Link>
          </div>
          <div>
            <p>Are you a nanny looking for work?</p>
            <Link to="/login" className="button">Register via TAXISNET</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Neighborhood Nannies. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
