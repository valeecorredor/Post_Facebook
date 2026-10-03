import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    fecha_nacimiento: '1990-01-01',
    genero: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = register(formData);
    if (success) {
      navigate('/');
    } else {
      setError('El correo ya está registrado.');
    }
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '600px', marginTop: '100px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Crear cuenta</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleSubmit}>
          {error && <div className="w3-panel w3-red w3-padding">{error}</div>}
          <div className="w3-section">
            <label><i className="fa fa-user"></i> Nombre completo</label>
            <input className="w3-input w3-border w3-round" type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Juan Pérez" required />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-envelope"></i> Correo electrónico</label>
            <input className="w3-input w3-border w3-round" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" required />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-lock"></i> Contraseña</label>
            <input className="w3-input w3-border w3-round" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" required />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-calendar"></i> Fecha de nacimiento</label>
            <input className="w3-input w3-border w3-round" type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
          </div>
          <div className="w3-section">
            <label><i className="fa fa-venus-mars"></i> Género</label>
            <select className="w3-select w3-border w3-round" name="genero" value={formData.genero} onChange={handleChange}>
              <option value="" disabled>Selecciona</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="w3-section">
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section"><i className="fa fa-user-plus"></i> Registrarse</button>
          </div>
          <p className="w3-center">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>.</p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
