import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
          <button 
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" 
            onClick={toggleMenu}
          >
            <i className="fa fa-bars"></i>
          </button>
          
          <NavLink to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4">
            <i className="fa fa-home w3-margin-right"></i>Logo
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink to="/perfil" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Perfil"><i className="fa fa-user"></i></NavLink>
              <NavLink to="/chat" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Mensajes"><i className="fa fa-envelope"></i></NavLink>
              <NavLink to="/grupos" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Grupos"><i className="fa fa-users"></i></NavLink>
              
              <div className="w3-dropdown-hover w3-hide-small">
                <button className="w3-button w3-padding-large" title="Notificaciones">
                  <i className="fa fa-bell"></i><span className="w3-badge w3-right w3-small w3-green">3</span>
                </button>     
                <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={{width: '300px'}}>
                  <span className="w3-bar-item w3-button">Una nueva solicitud de amistad</span>
                  <span className="w3-bar-item w3-button">John Doe publicó en tu muro</span>
                  <span className="w3-bar-item w3-button">Jane le gusta tu publicación</span>
                </div>
              </div>

              <button onClick={handleLogout} className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Cerrar sesión">
                <i className="fa fa-sign-out"></i> Salir
              </button>
              <NavLink to="/configuracion" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="Configuración"><i className="fa fa-cog"></i></NavLink>
              <span className="w3-bar-item w3-hide-small w3-right w3-padding-large">Hola, {user.nombre}</span>
            </>
          ) : (
            <>
              <NavLink to="/login" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><i className="fa fa-sign-in"></i> Iniciar sesión</NavLink>
              <NavLink to="/registro" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"><i className="fa fa-user-plus"></i> Registrarse</NavLink>
            </>
          )}
        </div>
      </div>

      {/* Navbar on small screens */}
      <div id="navDemo" className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${isMenuOpen ? 'w3-show' : 'w3-hide'}`}>
        {isAuthenticated ? (
          <>
            <NavLink to="/" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Inicio</NavLink>
            <NavLink to="/perfil" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Perfil</NavLink>
            <NavLink to="/chat" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Mensajes</NavLink>
            <NavLink to="/grupos" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Grupos</NavLink>
            <NavLink to="/configuracion" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Configuración</NavLink>
            <button onClick={handleLogout} className="w3-bar-item w3-button w3-padding-large">Cerrar sesión</button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Iniciar sesión</NavLink>
            <NavLink to="/registro" onClick={toggleMenu} className="w3-bar-item w3-button w3-padding-large">Registrarse</NavLink>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
