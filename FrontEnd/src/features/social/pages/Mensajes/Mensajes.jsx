import { useState } from 'react';
import { MessageSquare, Send, Search } from 'lucide-react';
import styles from './Mensajes.module.css';

/**
 * Página Mensajes - Sistema de mensajería básico
 * Preparado para WebSockets en el futuro
 */
const Mensajes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Mock data
  const chats = [
    { id: 1, nombre: 'María González', ultimoMensaje: 'Hola, ¿cómo estás?', tiempo: '10:30 AM', unread: 2 },
    { id: 2, nombre: 'Empresa Globant', ultimoMensaje: 'Gracias por postularte', tiempo: 'Ayer', unread: 0 },
    { id: 3, nombre: 'Carlos Pérez', ultimoMensaje: 'Nos vemos mañana', tiempo: '2 días', unread: 1 }
  ];

  const messages = selectedChat ? [
    { id: 1, autor: 'otro', texto: '¡Hola! ¿Cómo estás?', tiempo: '10:30 AM' },
    { id: 2, autor: 'yo', texto: 'Muy bien, ¿y tú?', tiempo: '10:32 AM' },
    { id: 3, autor: 'otro', texto: 'Excelente, ¿tienes tiempo para revisar el proyecto?', tiempo: '10:35 AM' }
  ] : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      // Aquí se conectaría con el backend
      console.log('Enviando mensaje:', messageText);
      setMessageText('');
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.mensajesPage}>
      <div className={styles.sidebar}>
        <header className={styles.sidebarHeader}>
          <h2><MessageSquare size={24} /> Mensajes</h2>
        </header>
        
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text"
            placeholder="Buscar conversaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.chatList}>
          {filteredChats.map(chat => (
            <div 
              key={chat.id}
              className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.active : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className={styles.chatAvatar}>{chat.nombre[0]}</div>
              <div className={styles.chatInfo}>
                <h4>{chat.nombre}</h4>
                <p>{chat.ultimoMensaje}</p>
              </div>
              <div className={styles.chatMeta}>
                <span className={styles.tiempo}>{chat.tiempo}</span>
                {chat.unread > 0 && <span className={styles.badge}>{chat.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mainChat}>
        {selectedChat ? (
          <>
            <header className={styles.chatHeader}>
              <div className={styles.chatAvatar}>{selectedChat.nombre[0]}</div>
              <h3>{selectedChat.nombre}</h3>
            </header>

            <div className={styles.messagesList}>
              {messages.map(msg => (
                <div key={msg.id} className={`${styles.message} ${styles[msg.autor]}`}>
                  <div className={styles.messageBubble}>
                    <p>{msg.texto}</p>
                    <span className={styles.messageTime}>{msg.tiempo}</span>
                  </div>
                </div>
              ))}
            </div>

            <form className={styles.inputArea} onSubmit={handleSendMessage}>
              <input 
                type="text"
                placeholder="Escribe un mensaje..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button type="submit">
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.emptyState}>
            <MessageSquare size={64} />
            <h3>Selecciona una conversación</h3>
            <p>Elige un chat para empezar a conversar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mensajes;
