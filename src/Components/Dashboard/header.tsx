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
        //credentials: 'include', // Incluye las credenciales (cookies) en la solicitud
      });
      if (response.ok) {
        const data: LogoutResponse = await response.json();
        console.log(data.message);
        navigate('/'); // Redirige a la página de inicio de sesión después del cierre de sesión
      } else {
        console.error('Logout failed');
      }

  };

  return (
    <header style={headerStyle}>
      <span>Moeeg</span>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
          <li><Link to="/doc-list-pac" style={linkStyle}>Pacientes</Link></li>
          <li><Link to="/model" style={linkStyle}>Modelo</Link></li>
          <li>
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
