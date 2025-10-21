import { useState } from 'react';
import { Settings, User, Bell, Lock, Eye, Globe, Trash2, Save } from 'lucide-react';
import { useAuth } from '../../../../context/AuthContext';
import styles from './Configuracion.module.css';

/**
 * Página de Configuración
 * Ajustes de cuenta, privacidad y notificaciones
 */
const Configuracion = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('CUENTA');
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    // Cuenta
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: '',
    
    // Privacidad
    perfilPublico: true,
    mostrarEmail: false,
    permitirMensajes: true,
    
    // Notificaciones
    notifEmail: true,
    notifNuevasOfertas: true,
    notifComentarios: true,
    notifLikes: false,
    notifConexiones: true,
    
    // Idioma
    idioma: 'es'
  });

  const handleSave = () => {
    // Aquí se conectaría con el backend
    console.log('Guardando configuración:', settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'CUENTA', label: 'Cuenta', icon: <User size={18} /> },
    { id: 'PRIVACIDAD', label: 'Privacidad', icon: <Lock size={18} /> },
    { id: 'NOTIFICACIONES', label: 'Notificaciones', icon: <Bell size={18} /> },
    { id: 'IDIOMA', label: 'Idioma', icon: <Globe size={18} /> }
  ];

  return (
    <div className={styles.configPage}>
      <header className={styles.header}>
        <h1><Settings size={32} /> Configuración</h1>
        <p>Personaliza tu experiencia en JobPath</p>
      </header>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? styles.active : ''}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </aside>

        <main className={styles.content}>
          {activeTab === 'CUENTA' && (
            <section className={styles.section}>
              <h2>Información de Cuenta</h2>
              
              <div className={styles.formGroup}>
                <label>Nombre completo</label>
                <input 
                  type="text"
                  value={settings.nombre}
                  onChange={(e) => setSettings({...settings, nombre: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input 
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Teléfono</label>
                <input 
                  type="tel"
                  value={settings.telefono}
                  onChange={(e) => setSettings({...settings, telefono: e.target.value})}
                  placeholder="+598 99 123 456"
                />
              </div>

              <div className={styles.dangerZone}>
                <h3>Zona de Peligro</h3>
                <p>Una vez que elimines tu cuenta, no hay vuelta atrás.</p>
                <button className={styles.btnDanger}>
                  <Trash2 size={18} /> Eliminar Cuenta
                </button>
              </div>
            </section>
          )}

          {activeTab === 'PRIVACIDAD' && (
            <section className={styles.section}>
              <h2>Privacidad y Seguridad</h2>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div>
                    <h4><Eye size={18} /> Perfil Público</h4>
                    <p>Permite que otros usuarios vean tu perfil completo</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.perfilPublico}
                      onChange={(e) => setSettings({...settings, perfilPublico: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Mostrar Email</h4>
                    <p>Tu email será visible en tu perfil público</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.mostrarEmail}
                      onChange={(e) => setSettings({...settings, mostrarEmail: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Permitir Mensajes</h4>
                    <p>Otros usuarios pueden enviarte mensajes directos</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.permitirMensajes}
                      onChange={(e) => setSettings({...settings, permitirMensajes: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'NOTIFICACIONES' && (
            <section className={styles.section}>
              <h2>Preferencias de Notificaciones</h2>

              <div className={styles.toggleGroup}>
                <div className={styles.toggleItem}>
                  <div>
                    <h4>Notificaciones por Email</h4>
                    <p>Recibe resúmenes diarios en tu correo</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.notifEmail}
                      onChange={(e) => setSettings({...settings, notifEmail: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Nuevas Ofertas</h4>
                    <p>Notificaciones cuando se publican ofertas relevantes</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.notifNuevasOfertas}
                      onChange={(e) => setSettings({...settings, notifNuevasOfertas: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Comentarios</h4>
                    <p>Cuando alguien comenta en tus publicaciones</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.notifComentarios}
                      onChange={(e) => setSettings({...settings, notifComentarios: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Likes</h4>
                    <p>Cuando alguien da like a tus posts</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.notifLikes}
                      onChange={(e) => setSettings({...settings, notifLikes: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>

                <div className={styles.toggleItem}>
                  <div>
                    <h4>Conexiones</h4>
                    <p>Solicitudes y aceptaciones de conexión</p>
                  </div>
                  <label className={styles.switch}>
                    <input 
                      type="checkbox"
                      checked={settings.notifConexiones}
                      onChange={(e) => setSettings({...settings, notifConexiones: e.target.checked})}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'IDIOMA' && (
            <section className={styles.section}>
              <h2>Idioma y Región</h2>

              <div className={styles.formGroup}>
                <label>Idioma de la aplicación</label>
                <select 
                  value={settings.idioma}
                  onChange={(e) => setSettings({...settings, idioma: e.target.value})}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>

              <p className={styles.hint}>
                El cambio de idioma se aplicará después de guardar y recargar la página.
              </p>
            </section>
          )}

          <div className={styles.actions}>
            <button className={styles.btnSave} onClick={handleSave}>
              <Save size={18} /> Guardar Cambios
            </button>
            {saved && <span className={styles.savedMessage}>✓ Cambios guardados</span>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Configuracion;
