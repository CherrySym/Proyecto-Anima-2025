import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, Star, FileText, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import OrientacionVocacional from './pages/OrientacionVocacional';
import Consejos from './pages/Consejos';
import CVCarta from './pages/CVCarta';
import EntrevistaIA from './pages/EntrevistaIA';
import styles from './Recursos.module.css';

function Recursos() {
  const navigate = useNavigate();
  const { seccion } = useParams();
  const [activeSection, setActiveSection] = useState('orientacion');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (seccion) {
      setActiveSection(seccion);
    }
  }, [seccion]);

  const menuItems = [
     { id: 'orientacion', label: 'Orientación Vocacional', icon: Sparkles },
     { id: 'consejos', label: 'Consejos', icon: Star },
     { id: 'cv-carta', label: 'CV y Carta de Presentación', icon: FileText },
     { id: 'entrevista-ia', label: 'Entrenamientos de entrevista con IA', icon: MessageSquare },
  ];

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    navigate(`/recursos/${sectionId}`);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'orientacion':
        return <OrientacionVocacional />;
      case 'consejos':
        return <Consejos />;
      case 'cv-carta':
        return <CVCarta />;
      case 'entrevista-ia':
        return <EntrevistaIA />;
      default:
        return <OrientacionVocacional />;
    }
  };

  return (
    <div className={styles['recursos-container']}>
      {/* Sidebar de navegación */}
      <aside className={`${styles['recursos-sidebar']} ${sidebarCollapsed ? styles['collapsed'] : ''}`}>
        {!sidebarCollapsed && (
          <>
            <div className={styles['sidebar-header']}>
              <h2>Recursos para ti</h2>
              <p>Herramientas para tu desarrollo profesional</p>
            </div>

            <nav className={styles['sidebar-menu']}>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`${styles['menu-item']} ${
                      activeSection === item.id ? styles['active'] : ''
                    }`}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </>
        )}

        {/* Botón de toggle */}
        <button 
          className={styles['sidebar-toggle']} 
          onClick={toggleSidebar}
          title={sidebarCollapsed ? 'Mostrar menú' : 'Ocultar menú'}
        >
          {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>

      {/* Contenido principal */}
      <main className={`${styles['recursos-content']} ${sidebarCollapsed ? styles['expanded'] : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default Recursos;
