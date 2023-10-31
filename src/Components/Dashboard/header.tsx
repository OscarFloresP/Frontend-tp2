import React from 'react';

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
          <li><a href="/" style={linkStyle}>Inicio</a></li>
          <li><a href="/doc-list-pac" style={linkStyle}>Paciente</a></li>
          <li><a href="/modelo" style={linkStyle}>Modelo</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;