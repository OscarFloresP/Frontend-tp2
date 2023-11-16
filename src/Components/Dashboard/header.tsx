import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;

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
  cursor: 'pointer',
};

interface LogoutResponse {
  message: string;
}
interface HeaderProps {
  appToken: string | null;
}
function Header({ appToken }:HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Token en Header:', appToken);

      const response = await fetch(`${API}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${appToken}`,
        },
      });
      if (response.ok) {
        const data: LogoutResponse = await response.json();
        console.log(data.message);
        navigate('/'); 
      } else {
        console.error('Logout failed');
      }

  };

  return (
    <header style={headerStyle}>
      {/* <img src='../moEeg.png' alt="logo" style={{ marginTop: '20px' }} /> */}
      <p style={{marginTop:'20px', marginLeft: '100px'}}>Moeeg</p>
      <nav style={{marginTop:'20px'}}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
          <li style={{marginLeft:'20px'}}><Link to="/doc-list-pac" style={linkStyle}>Pacientes</Link></li>
          <li style={{marginLeft:'20px'}}><Link to="/model" style={linkStyle}>Modelo</Link></li>
          <li style={{marginLeft:'20px', marginRight: '60px'}}>
            <span style={linkStyle} onClick={handleLogout}>
              Cerrar Sesión
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
