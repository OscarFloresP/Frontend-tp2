import React from 'react';

const footerStyle: React.CSSProperties = {
  backgroundColor: '#69F9F0',
  color: '#000',
  padding: '20px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000',
  marginRight: '10px',
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="footer-content">
      <ul className="footer-links">
          <li><a href="/" style={linkStyle}>Inicio</a></li>
          <li><a href="/acerca" style={linkStyle}>Acerca de Nosotros</a></li>
          <li><a href="/contacto" style={linkStyle}>Contacto</a></li>
        </ul>
        <div>
        <p>&copy; 2023 Copyright: Hecho por MoEEG</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;