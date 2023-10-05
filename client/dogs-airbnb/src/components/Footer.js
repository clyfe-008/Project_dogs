import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Dogs-Airbnb</p>
          <p>Contact: johndoe@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
