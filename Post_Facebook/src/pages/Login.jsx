import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (!val.includes('@')) {
      setEmailError('El correo debe contener un "@".');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = email.includes('@') && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '500px', marginTop: '100px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Iniciar sesión</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleSubmit}>
          {error && <div className="w3-panel w3-red w3-padding">{error}</div>}
          <div className="w3-section">
            <label><i className="fa fa-envelope"></i> Correo electrónico</label>
            <input 
              className="w3-input w3-border w3-round" 
              type="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={handleEmailChange}
              required 
            />
            {emailError && <span className="w3-text-red w3-small">{emailError}</span>}
          </div>
          <div className="w3-section">
            <label><i className="fa fa-lock"></i> Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input 
                className="w3-input w3-border w3-round" 
                type={showPassword ? 'text' : 'password'}
                placeholder="********" 
                value={password}
                onChange={handlePasswordChange}
                style={{ paddingRight: '42px' }}
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0 4px',
                  fontSize: '15px'
                }}
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            {passwordError && <span className="w3-text-red w3-small">{passwordError}</span>}
          </div>
          <div className="w3-section">
            <button 
              type="submit" 
              className={`w3-button w3-round w3-block w3-section ${isFormValid ? 'w3-theme-d2' : 'w3-disabled'}`}
              disabled={!isFormValid}
            >
              <i className="fa fa-sign-in"></i> Acceder
            </button>
          </div>
          <p className="w3-center"><a href="#">¿Olvidaste tu contraseña?</a></p>
          <p className="w3-center">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
