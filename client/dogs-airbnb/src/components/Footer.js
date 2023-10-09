import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Dogs Airbnb</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
