import React, { useState } from 'react';

const Grupos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const misGrupos = [
    { id: 1, name: 'Diseñadores UI/UX', members: '1.2k', newPosts: 15, img: 'avatar2.png' },
    { id: 2, name: 'Desarrollo Web', members: '3.4k', newPosts: 8, img: 'avatar5.png' },
    { id: 3, name: 'Fotografía Creativa', members: '856', newPosts: 3, img: 'avatar6.png' }
  ];

  const gruposSugeridos = [
    { id: 4, name: 'Viajeros del mundo', members: '5.1k', img: 'forest.jpg' },
    { id: 5, name: 'Tecnología y gadgets', members: '8.2k', img: 'lights.jpg' },
    { id: 6, name: 'Cocina fácil', members: '2.7k', img: 'nature.jpg' }
  ];

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1200px', marginTop: '80px' }}>
      <div className="w3-row-padding">
        {/* Columna izquierda: Mis grupos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h3><i className="fa fa-group"></i> Mis grupos</h3>
            </div>
            <ul className="w3-ul">
              {misGrupos.map(grupo => (
                <li key={grupo.id} className="w3-padding-16">
                  <img src={`https://www.w3schools.com/w3images/${grupo.img}`} className="w3-left w3-circle w3-margin-right" style={{width: '50px', height: '50px', objectFit: 'cover'}} alt={grupo.name} />
                  <span className="w3-large">{grupo.name}</span><br />
                  <span className="w3-opacity">{grupo.members} miembros · {grupo.newPosts} publicaciones nuevas</span>
                  <button className="w3-button w3-small w3-theme-d2 w3-right w3-round">Ver grupo</button>
                </li>
              ))}
            </ul>
            <div className="w3-container w3-padding-16">
              <button className="w3-button w3-block w3-theme-l1"><i className="fa fa-plus"></i> Crear nuevo grupo</button>
            </div>
          </div>
        </div>

        {/* Columna derecha: Grupos sugeridos */}
        <div className="w3-col m6">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d1">
              <h3><i className="fa fa-star"></i> Grupos sugeridos</h3>
            </div>
            <ul className="w3-ul">
              {gruposSugeridos.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase())).map(grupo => (
                <li key={grupo.id} className="w3-padding-16">
                  <img src={`https://www.w3schools.com/w3images/${grupo.img}`} className="w3-left w3-circle w3-margin-right" style={{width: '50px', height: '50px', objectFit: 'cover'}} alt={grupo.name} />
                  <span className="w3-large">{grupo.name}</span><br />
                  <span className="w3-opacity">{grupo.members} miembros</span>
                  <button className="w3-button w3-small w3-green w3-right w3-round"><i className="fa fa-plus"></i> Unirse</button>
                </li>
              ))}
            </ul>
          </div>
          <br />
          {/* Buscar grupos */}
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16">
              <h4>Buscar grupos</h4>
              <input 
                className="w3-input w3-border w3-round" 
                type="text" 
                placeholder="Nombre del grupo..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button className="w3-button w3-theme-d2 w3-margin-top w3-round"><i className="fa fa-search"></i> Buscar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grupos;
