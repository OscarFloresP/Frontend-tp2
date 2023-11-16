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

const columnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1,
};

const contactStyle: React.CSSProperties = {
  borderBottom: '1px solid #000',
  width: '100px',
  paddingBottom: '4px',
  marginBottom: '30px',
};

const copyrightStyle: React.CSSProperties = {
  textAlign: 'center',
  borderTop: '1px solid #000',
  padding: '10px 0',
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 200px' }}>
        <div style={columnStyle}>
          <h3 style={contactStyle}>Contactanos</h3>
          <p>moeeg@gmail.com</p>
          <p>+51 974 324 545</p>
          <p>+51 966 371 128</p>
        </div>
        <div style={columnStyle}>
          <h3>Envianos un mensaje</h3>
          <p>Nombre: <input type="text" placeholder="Escribe tu nombre" style={{ padding: '5px', marginTop: '5px', width: '300px'}} /></p>
          <p>Correo:  <input type="text" placeholder="Escribe tu correo" style={{ padding: '5px', marginTop: '5px',marginLeft:'10px',width: '300px' }} /></p>
          <p>Comentario:<br/> <textarea placeholder="Escribe tu comentario" style={{ padding: '5px', marginTop: '5px', height: '80px', width: '370px' }} /></p>
          {/* Agrega aquí cualquier contenido relacionado con "Envianos un mensaje" */}
        </div>
      </div>
      <div style={copyrightStyle}>
        <p>&copy; 2023 Copyright: Hecho por MoEEG</p>
      </div>
    </footer>
  );
}

export default Footer;
