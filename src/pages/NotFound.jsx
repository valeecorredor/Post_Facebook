import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w3-container w3-content w3-center" style={{ marginTop: '150px' }}>
      <h1 className="w3-jumbo w3-text-theme"><i className="fa fa-exclamation-triangle"></i></h1>
      <h2>Error 404</h2>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link to="/" className="w3-button w3-theme-d2 w3-round w3-margin-top"><i className="fa fa-home"></i> Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
