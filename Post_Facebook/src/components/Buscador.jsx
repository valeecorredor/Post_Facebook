import React, { useState } from 'react';

const Buscador = () => {
  const [busqueda, setBusqueda] = useState('');

  const items = [
    { id: 1, name: 'John Doe', type: 'Usuario' },
    { id: 2, name: 'React Node Tutorial', type: 'Publicación' },
    { id: 3, name: 'Jane Doe', type: 'Usuario' },
    { id: 4, name: 'Desarrollo Web', type: 'Grupo' },
    { id: 5, name: 'Aprender JavaScript', type: 'Publicación' },
  ];

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const itemsFiltrados = items.filter(item => 
    item.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="w3-card w3-round w3-white w3-margin-bottom">
      <div className="w3-container w3-padding">
        <h6 className="w3-opacity">Buscador en tiempo real</h6>
        <input 
          type="text" 
          className="w3-input w3-border w3-round" 
          placeholder="Buscar usuarios, publicaciones..." 
          value={busqueda}
          onChange={handleBusquedaChange}
        />
        {busqueda && (
          <ul className="w3-ul w3-hoverable w3-margin-top w3-border">
            {itemsFiltrados.length > 0 ? (
              itemsFiltrados.map(item => (
                <li key={item.id} className="w3-padding-small">
                  <strong>{item.name}</strong> <span className="w3-opacity w3-small">({item.type})</span>
                </li>
              ))
            ) : (
              <li className="w3-padding-small w3-text-red">No se encontraron resultados</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Buscador;
