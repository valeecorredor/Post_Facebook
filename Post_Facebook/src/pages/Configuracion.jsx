import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Configuracion = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1000px', marginTop: '80px' }}>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container w3-padding-16 w3-theme-d2">
          <h2><i className="fa fa-cogs"></i> Configuración de la cuenta</h2>
        </div>

        {/* Pestañas */}
        <div className="w3-bar w3-theme-l4">
          <button className={`w3-bar-item w3-button tablink ${activeTab === 'General' ? 'w3-theme-d1' : ''}`} onClick={() => setActiveTab('General')}>General</button>
          <button className={`w3-bar-item w3-button tablink ${activeTab === 'Privacidad' ? 'w3-theme-d1' : ''}`} onClick={() => setActiveTab('Privacidad')}>Privacidad</button>
          <button className={`w3-bar-item w3-button tablink ${activeTab === 'Notificaciones' ? 'w3-theme-d1' : ''}`} onClick={() => setActiveTab('Notificaciones')}>Notificaciones</button>
        </div>

        {/* Contenido de pestañas */}
        <div className="w3-container tab w3-padding-24" style={{ display: activeTab === 'General' ? 'block' : 'none' }}>
          <h4>Información personal</h4>
          <div className="w3-section">
            <label>Nombre</label>
            <input className="w3-input w3-border w3-round" type="text" defaultValue={user.nombre} />
          </div>
          <div className="w3-section">
            <label>Correo electrónico</label>
            <input className="w3-input w3-border w3-round" type="email" defaultValue={user.email} />
          </div>
          <div className="w3-section">
            <label>Biografía</label>
            <textarea className="w3-input w3-border w3-round" rows="3" defaultValue="Diseñador UI/UX. Amante del café."></textarea>
          </div>
          <button className="w3-button w3-theme-d2 w3-round"><i className="fa fa-save"></i> Guardar cambios</button>
        </div>

        <div className="w3-container tab w3-padding-24" style={{ display: activeTab === 'Privacidad' ? 'block' : 'none' }}>
          <h4>Privacidad y seguridad</h4>
          <div className="w3-section">
            <label>¿Quién puede ver tu perfil?</label>
            <select className="w3-select w3-border w3-round" defaultValue="Solo amigos">
              <option value="Todos">Todos</option>
              <option value="Solo amigos">Solo amigos</option>
              <option value="Solo yo">Solo yo</option>
            </select>
          </div>
          <div className="w3-section">
            <label>¿Quién puede enviarte solicitudes de amistad?</label>
            <select className="w3-select w3-border w3-round" defaultValue="Amigos de amigos">
              <option value="Todos">Todos</option>
              <option value="Amigos de amigos">Amigos de amigos</option>
            </select>
          </div>
          <div className="w3-section">
            <label>Cambiar contraseña</label>
            <input className="w3-input w3-border w3-round" type="password" placeholder="Nueva contraseña" />
          </div>
          <button className="w3-button w3-theme-d2 w3-round"><i className="fa fa-lock"></i> Actualizar privacidad</button>
        </div>

        <div className="w3-container tab w3-padding-24" style={{ display: activeTab === 'Notificaciones' ? 'block' : 'none' }}>
          <h4>Preferencias de notificaciones</h4>
          <div className="w3-section">
            <input className="w3-check" type="checkbox" defaultChecked /> <label>Recibir notificaciones por correo</label>
          </div>
          <div className="w3-section">
            <input className="w3-check" type="checkbox" defaultChecked /> <label>Notificaciones de nuevos mensajes</label>
          </div>
          <div className="w3-section">
            <input className="w3-check" type="checkbox" /> <label>Notificaciones de cumpleaños</label>
          </div>
          <div className="w3-section">
            <input className="w3-check" type="checkbox" defaultChecked /> <label>Notificaciones de grupos</label>
          </div>
          <button className="w3-button w3-theme-d2 w3-round"><i className="fa fa-bell"></i> Guardar preferencias</button>
        </div>
      </div>
    </div>
  );
};

export default Configuracion;
