import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const CrearPost = ({ onPostCreado }) => {
  const { user } = useAuth();
  const [texto, setTexto] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [mostrarImagen, setMostrarImagen] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    setCargando(true);
    setError('');

    try {
      const response = await fetch('/api/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: user.id,
          texto: texto.trim(),
          imagen_url: imagenUrl.trim() || null,
        }),
      });

      if (response.ok) {
        setTexto('');
        setImagenUrl('');
        setMostrarImagen(false);
        if (onPostCreado) onPostCreado();
      } else {
        const data = await response.json();
        setError(data.error || 'Error al publicar');
      }
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w3-card w3-round w3-white w3-margin-bottom">
      <div className="w3-container w3-padding">
        {/* Header del creador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <img
            src={user?.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
            alt="avatar"
            className="w3-circle"
            style={{ width: '42px', height: '42px', objectFit: 'cover' }}
          />
          <span className="w3-opacity" style={{ fontSize: '14px' }}>
            ¿Qué estás pensando, <strong>{user?.nombre || 'usuario'}</strong>?
          </span>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w3-input w3-border w3-round"
            rows={3}
            placeholder={`Comparte algo con la comunidad...`}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            style={{ resize: 'none', fontSize: '15px', padding: '10px' }}
            required
          />

          {/* Campo de URL de imagen opcional */}
          {mostrarImagen && (
            <div className="w3-margin-top">
              <input
                className="w3-input w3-border w3-round"
                type="url"
                placeholder="URL de imagen  ej: https://..."
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
              />
              {imagenUrl && (
                <img
                  src={imagenUrl}
                  alt="preview"
                  className="w3-margin-top w3-round"
                  style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          )}

          {error && (
            <div className="w3-panel w3-red w3-round w3-margin-top w3-padding-small">
              <i className="fa fa-exclamation-circle" /> {error}
            </div>
          )}

          {/* Barra de acciones */}
          <div
            className="w3-margin-top"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}
          >
            <button
              type="button"
              className={`w3-button w3-round w3-small ${mostrarImagen ? 'w3-theme-d2' : 'w3-light-grey'}`}
              onClick={() => setMostrarImagen(!mostrarImagen)}
              title="Agregar imagen por URL"
            >
              <i className="fa fa-image" /> Imagen
            </button>

            <button
              type="submit"
              className="w3-button w3-theme w3-round"
              disabled={!texto.trim() || cargando}
              style={{ minWidth: '100px', opacity: (!texto.trim() || cargando) ? 0.6 : 1 }}
            >
              {cargando
                ? <><i className="fa fa-spinner fa-spin" /> Publicando...</>
                : <><i className="fa fa-paper-plane" /> Publicar</>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPost;
