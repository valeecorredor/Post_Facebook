import React, { useState, useEffect, useCallback } from 'react';
import Buscador from '../components/Buscador';
import CrearPost from '../components/CrearPost';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [activeAccordion, setActiveAccordion] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [posts, setPosts] = useState([]);
  const [cargandoPosts, setCargandoPosts] = useState(true);
  const [errorFeed, setErrorFeed] = useState('');

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  const cargarPosts = useCallback(async () => {
    setCargandoPosts(true);
    setErrorFeed('');
    try {
      const res = await fetch('/api/publicaciones');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        setErrorFeed('No se pudieron cargar las publicaciones.');
      }
    } catch {
      setErrorFeed('Error de conexión con el servidor.');
    } finally {
      setCargandoPosts(false);
    }
  }, []);

  useEffect(() => {
    cargarPosts();
  }, [cargarPosts]);

  const formatFecha = (fecha) => {
    const d = new Date(fecha);
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: '80px' }}>
      <div className="w3-row">
        {/* Left Column */}
        <div className="w3-col m3">
          {/* Profile */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container">
             <h4 className="w3-center">Mi Perfil</h4>
             <p className="w3-center">
               <img
                 src={user?.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
                 className="w3-circle"
                 style={{height:'106px', width:'106px', objectFit:'cover'}}
                 alt="Avatar"
               />
             </p>
             <p className="w3-center"><strong>{user?.nombre}</strong></p>
             <hr />
             <p><i className="fa fa-envelope fa-fw w3-margin-right w3-text-theme"></i>{user?.email}</p>
            </div>
          </div>
          <br />
          
          {/* Accordion */}
          <div className="w3-card w3-round">
            <div className="w3-white">
              <button onClick={() => toggleAccordion('Demo1')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo1' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-circle-o-notch fa-fw w3-margin-right"></i> My Groups</button>
              <div id="Demo1" className={`w3-container ${activeAccordion === 'Demo1' ? 'w3-show' : 'w3-hide'}`}>
                <p>Some text..</p>
              </div>
              <button onClick={() => toggleAccordion('Demo2')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo2' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-calendar-check-o fa-fw w3-margin-right"></i> My Events</button>
              <div id="Demo2" className={`w3-container ${activeAccordion === 'Demo2' ? 'w3-show' : 'w3-hide'}`}>
                <p>Some other text..</p>
              </div>
              <button onClick={() => toggleAccordion('Demo3')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'Demo3' ? 'w3-theme-d1' : 'w3-theme-l1'}`}><i className="fa fa-users fa-fw w3-margin-right"></i> My Photos</button>
              <div id="Demo3" className={`w3-container ${activeAccordion === 'Demo3' ? 'w3-show' : 'w3-hide'}`}>
                <div className="w3-row-padding">
                  <br />
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/lights.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Lights"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/nature.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Nature"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/mountains.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Mountains"/></div>
                  <div className="w3-half"><img src="https://www.w3schools.com/w3images/forest.jpg" style={{width:'100%'}} className="w3-margin-bottom" alt="Forest"/></div>
                </div>
              </div>
            </div>      
          </div>
          <br />
          
          {/* Alert Box */}
          {showAlert && (
            <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
              <span onClick={() => setShowAlert(false)} className="w3-button w3-theme-l3 w3-display-topright">
                <i className="fa fa-remove"></i>
              </span>
              <p><strong>¡Bienvenido!</strong></p>
              <p>Comparte algo con la comunidad.</p>
            </div>
          )}
        </div>
        
        {/* Middle Column — Feed */}
        <div className="w3-col m7">
          <div className="w3-row-padding">
            <div className="w3-col m12">
              <Buscador />
            </div>
          </div>

          {/* Formulario para crear post */}
          <div className="w3-row-padding">
            <div className="w3-col m12">
              <CrearPost onPostCreado={cargarPosts} />
            </div>
          </div>

          {/* Feed de publicaciones desde la API */}
          <div className="w3-row-padding">
            <div className="w3-col m12">
              {cargandoPosts && (
                <div className="w3-center w3-padding">
                  <i className="fa fa-spinner fa-spin fa-2x w3-text-theme"></i>
                  <p className="w3-opacity">Cargando publicaciones...</p>
                </div>
              )}

              {errorFeed && (
                <div className="w3-panel w3-red w3-round w3-padding">
                  <i className="fa fa-exclamation-triangle" /> {errorFeed}
                  <button className="w3-button w3-small w3-white w3-round w3-margin-left" onClick={cargarPosts}>
                    Reintentar
                  </button>
                </div>
              )}

              {!cargandoPosts && !errorFeed && posts.length === 0 && (
                <div className="w3-card w3-round w3-white w3-center w3-padding-32">
                  <i className="fa fa-inbox fa-3x w3-text-theme-l3"></i>
                  <p className="w3-opacity">Aún no hay publicaciones. ¡Sé el primero!</p>
                </div>
              )}

              {posts.map((post) => (
                <div key={post.id} className="w3-card w3-round w3-white w3-margin-bottom">
                  {/* Cabecera del post */}
                  <div className="w3-container w3-padding" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={post.avatar || 'https://www.w3schools.com/w3images/avatar2.png'}
                      alt={post.autor}
                      className="w3-circle"
                      style={{ width: '44px', height: '44px', objectFit: 'cover' }}
                    />
                    <div>
                      <strong>{post.autor}</strong>
                      <div className="w3-opacity w3-small">
                        <i className="fa fa-clock-o" /> {formatFecha(post.fecha_creacion)}
                      </div>
                    </div>
                  </div>

                  {/* Texto del post */}
                  <div className="w3-container w3-padding-small" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
                    <p style={{ fontSize: '15px', margin: '4px 0 8px' }}>{post.texto}</p>
                  </div>

                  {/* Imagen del post (si tiene) */}
                  {post.imagen_url && (
                    <img
                      src={post.imagen_url}
                      alt="Publicación"
                      style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}

                  {/* Estadísticas */}
                  <div className="w3-container w3-padding-small w3-border-top" style={{ display: 'flex', gap: '16px', padding: '8px 16px' }}>
                    <span className="w3-opacity w3-small">
                      <i className="fa fa-thumbs-up w3-text-theme" /> {post.total_likes} Me gusta
                    </span>
                    <span className="w3-opacity w3-small">
                      <i className="fa fa-comment w3-text-theme" /> {post.total_comentarios} Comentarios
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="w3-col m2">
          <div className="w3-card w3-round w3-white w3-center">
            <div className="w3-container">
              <p>Upcoming Events:</p>
              <img src="https://www.w3schools.com/w3images/forest.jpg" alt="Forest" style={{width:'100%'}} />
              <p><strong>Holiday</strong></p>
              <p>Friday 15:00</p>
              <p><button className="w3-button w3-block w3-theme-l4">Info</button></p>
            </div>
          </div>
          <br />
          
          <div className="w3-card w3-round w3-white w3-center">
            <div className="w3-container">
              <p>Friend Request</p>
              <img src="https://www.w3schools.com/w3images/avatar6.png" alt="Avatar" style={{width:'50%'}} /><br />
              <span>Jane Doe</span>
              <div className="w3-row w3-opacity">
                <div className="w3-half">
                  <button className="w3-button w3-block w3-green w3-section" title="Accept"><i className="fa fa-check"></i></button>
                </div>
                <div className="w3-half">
                  <button className="w3-button w3-block w3-red w3-section" title="Decline"><i className="fa fa-remove"></i></button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
            <p>ADS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
