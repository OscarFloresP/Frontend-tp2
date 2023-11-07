import React from 'react';
import {Link} from 'react-router-dom'

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#69F9F0',
  color: '#000',
  padding: '10px 20px',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#000',
  marginRight: '10px',
  listStyle: 'none',
};

function Header() {
  return (
    <header style={headerStyle}>
      <span>Moeeg</span>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
          <li><Link to="/" style={linkStyle}>Inicio</Link></li>
          <li><Link to="/doc-list-pac" style={linkStyle}>Paciente</Link></li>
          <li><Link to="/" style={linkStyle}>Modelo</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;