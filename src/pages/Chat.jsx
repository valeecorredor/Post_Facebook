import { useState } from 'react';

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  
  const [conversation, setConversation] = useState([
    { id: 1, sender: 'Jane Doe', time: '10:28', text: '¡Hola! ¿Cómo va el diseño?', isMe: false },
    { id: 2, sender: 'Tú', time: '10:30', text: 'Muy bien, casi terminado. ¿Te gustó la última versión?', isMe: true },
    { id: 3, sender: 'Jane Doe', time: '10:32', text: 'Sí, está genial. Solo unos ajustes en los colores.', isMe: false }
  ]);

  const chats = [
    { id: 1, name: 'Jane Doe', lastMessage: conversation[conversation.length - 1].text, time: '10:32', img: 'avatar5.png', active: activeChat === 1 },
    { id: 2, name: 'Angie Jane', lastMessage: '¿Viste el nuevo proyecto?', time: 'Ayer', img: 'avatar6.png', active: activeChat === 2 },
    { id: 3, name: 'John Doe', lastMessage: '¡Claro! Quedó genial.', time: 'Ayer', img: 'avatar2.png', active: activeChat === 3 }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      sender: 'Tú',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: message,
      isMe: true
    };

    setConversation([...conversation, newMessage]);
    setMessage('');
  };

  return (
    <div className="w3-container w3-content" style={{ maxWidth: '1200px', marginTop: '80px' }}>
      <div className="w3-row">
        {/* Lista de chats */}
        <div className="w3-col m4">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2">
              <h4><i className="fa fa-comments"></i> Conversaciones</h4>
              <div className="w3-section">
                <input className="w3-input w3-border w3-round" type="text" placeholder="Buscar mensajes..." />
              </div>
            </div>
            <ul className="w3-ul w3-hoverable">
              {chats.map(chat => (
                <li 
                  key={chat.id} 
                  className={`w3-padding-16 ${activeChat === chat.id ? 'w3-theme-l4' : ''}`}
                  onClick={() => setActiveChat(chat.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={`https://www.w3schools.com/w3images/${chat.img}`} className="w3-left w3-circle w3-margin-right" style={{width:'50px'}} alt={chat.name} />
                  <span className="w3-large">{chat.name}</span><br />
                  <span className="w3-opacity">{chat.lastMessage}</span>
                  <span className="w3-right w3-small w3-text-theme">{chat.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ventana de chat activa */}
        <div className="w3-col m8">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-large">
              <h4>
                <img src="https://www.w3schools.com/w3images/avatar5.png" className="w3-circle" style={{width:'40px', verticalAlign:'middle'}} alt="Avatar" /> 
                {' '}Jane Doe <span className="w3-opacity w3-medium"> · Activa ahora</span>
              </h4>
            </div>
            <div className="w3-container w3-padding-16" style={{height:'400px', overflowY:'scroll'}}>
              {activeChat === 1 ? conversation.map(msg => (
                <div key={msg.id} className={`w3-panel w3-round-large ${msg.isMe ? 'w3-rightbar w3-border-green w3-theme-l4 w3-right' : 'w3-leftbar w3-border-blue w3-theme-l5'}`} style={{maxWidth:'80%', clear:'both', float: msg.isMe ? 'right' : 'left'}}>
                  <p><strong>{msg.sender}</strong> <span className="w3-opacity">{msg.time}</span></p>
                  <p>{msg.text}</p>
                </div>
              )) : (
                <div className="w3-center w3-opacity w3-margin-top">
                  <p>Selecciona una conversación para ver los mensajes</p>
                </div>
              )}
              {/* Esto forza al contenedor a abrazar los elementos flotantes */}
              <div style={{clear: 'both'}}></div>
            </div>
            <div className="w3-container w3-padding-16 w3-border-top">
              <form className="w3-row" onSubmit={handleSendMessage}>
                <div className="w3-col s9">
                  <input 
                    className="w3-input w3-border w3-round" 
                    type="text" 
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    disabled={activeChat !== 1}
                  />
                </div>
                <div className="w3-col s3">
                  <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block" disabled={activeChat !== 1}><i className="fa fa-paper-plane"></i> Enviar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
