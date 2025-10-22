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

  // Mock data - 3 conversaciones diferentes
  const chats = [
    { id: 1, nombre: 'María González', ultimoMensaje: 'Te recomiendo ese curso de Python', tiempo: '10:30 AM', unread: 2 },
    { id: 2, nombre: 'Empresa Globant', ultimoMensaje: 'Tu perfil nos interesa mucho', tiempo: 'Ayer', unread: 0 },
    { id: 3, nombre: 'Carlos Pérez', ultimoMensaje: '¿Participas en el desafío?', tiempo: '2 días', unread: 1 }
  ];

  // Mensajes diferentes según el chat seleccionado
  const getMessagesForChat = (chatId) => {
    switch(chatId) {
      case 1: // María González
        return [
          { id: 1, autor: 'otro', texto: '¡Hola! Vi que estás buscando mejorar tus habilidades', tiempo: '10:15 AM' },
          { id: 2, autor: 'yo', texto: 'Sí, quiero aprender programación', tiempo: '10:20 AM' },
          { id: 3, autor: 'otro', texto: 'Te recomiendo ese curso de Python que está en la plataforma', tiempo: '10:22 AM' },
          { id: 4, autor: 'yo', texto: '¡Gracias! Lo voy a revisar', tiempo: '10:25 AM' },
          { id: 5, autor: 'otro', texto: 'También podríamos estudiar juntos si quieres', tiempo: '10:30 AM' }
        ];
      case 2: // Empresa Globant
        return [
          { id: 1, autor: 'otro', texto: 'Hola, somos de Recursos Humanos de Globant', tiempo: 'Ayer 9:00 AM' },
          { id: 2, autor: 'otro', texto: 'Vimos tu postulación para Desarrollador Junior', tiempo: 'Ayer 9:01 AM' },
          { id: 3, autor: 'yo', texto: '¡Hola! Sí, me interesa mucho la posición', tiempo: 'Ayer 9:15 AM' },
          { id: 4, autor: 'otro', texto: 'Tu perfil nos interesa mucho. ¿Estarías disponible para una entrevista?', tiempo: 'Ayer 10:30 AM' },
          { id: 5, autor: 'yo', texto: 'Por supuesto, ¿cuándo sería conveniente?', tiempo: 'Ayer 11:00 AM' },
          { id: 6, autor: 'otro', texto: 'Te contactaremos pronto con los detalles', tiempo: 'Ayer 2:30 PM' }
        ];
      case 3: // Carlos Pérez
        return [
          { id: 1, autor: 'otro', texto: 'Hey! ¿Viste el nuevo desafío de diseño?', tiempo: '2 días 3:00 PM' },
          { id: 2, autor: 'yo', texto: 'Sí! Se ve interesante', tiempo: '2 días 3:15 PM' },
          { id: 3, autor: 'otro', texto: '¿Participas en el desafío? Podemos formar equipo', tiempo: '2 días 3:20 PM' },
          { id: 4, autor: 'yo', texto: 'Me parece buena idea, ¿cuándo empezamos?', tiempo: '2 días 4:00 PM' },
          { id: 5, autor: 'otro', texto: 'Mañana te comparto mi propuesta inicial', tiempo: '2 días 5:30 PM' }
        ];
      default:
        return [];
    }
  };

  const messages = selectedChat ? getMessagesForChat(selectedChat.id) : [];

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
                placeholder="Próximamente..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                disabled
                style={{ cursor: 'not-allowed', opacity: 0.7 }}
              />
              <button type="submit" disabled style={{ cursor: 'not-allowed', opacity: 0.7 }}>
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
