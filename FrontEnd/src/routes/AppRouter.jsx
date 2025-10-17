import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header/Header';
import PrivateRoute from '../components/PrivateRoute';

// Páginas públicas
import Landing from '../pages/Landing/Landing';
import About from '../pages/About/About';
import Companias from '../pages/Companias/Companias';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import OrientacionVocacional from '../pages/OrientacionVocacional/OrientacionVocacional';
import Suscripciones from '../pages/Suscripciones/Suscripciones';
import Consejos from '../pages/Consejos/Consejos';
import CVyCarta from '../pages/CVyCarta/CVyCarta';
import Entrevistas from '../pages/Entrevistas/Entrevistas';
import Contacto from '../pages/Contacto/Contacto';
import Curriculum from '../pages/Curriculum/Curriculum';
import Pago from '../pages/Pago/Pago';
import OrientacionPersonalizada from '../pages/OrientacionPersonalizada/OrientacionPersonalizada';
import CompanyProfilePublic from '../pages/CompanyProfilePublic/CompanyProfilePublic';

// Páginas de red social (requieren autenticación)
import Feed from '../pages/Feed/Feed';
import UserProfile from '../pages/UserProfile/UserProfile';
import CompanyProfile from '../pages/CompanyProfile/CompanyProfile';

// Páginas existentes
import Home from '../pages/Home/Home';
import Ofertas from '../pages/Ofertas/Ofertas';
import OfertaDetalle from '../pages/OfertaDetalle/OfertaDetalle';
import MisPostulaciones from '../pages/MisPostulaciones/MisPostulaciones';
import Desafios from '../pages/Desafios/Desafios';
import MisDesafios from '../pages/MisDesafios/MisDesafios';
import Cursos from '../pages/Cursos/Cursos';
import MisCursos from '../pages/MisCursos/MisCursos';

const AppRouter = () => {
  const { user, loading, error } = useAuth();

  // Mostrar loading mientras se inicializa la autenticación
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#333',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ 
          marginBottom: '20px',
          fontSize: '3rem'
        }}>
          🔄
        </div>
        <div style={{ fontWeight: 'bold' }}>
          Cargando JobPath...
        </div>
        <div style={{ 
          fontSize: '0.9rem', 
          color: '#666',
          marginTop: '10px'
        }}>
          {new Date().toLocaleTimeString()}
        </div>
        {error && (
          <div style={{
            backgroundColor: '#ffeaa7',
            color: '#2d3436',
            padding: '15px 25px',
            borderRadius: '8px',
            fontSize: '0.9rem',
            textAlign: 'center',
            maxWidth: '500px',
            marginTop: '20px',
            border: '2px solid #fdcb6e'
          }}>
            ⚠️ {error}
          </div>
        )}
      </div>
    );
  }
  

  return (
    <Routes>
      {/* Página principal - Landing sin autenticación */}
      <Route path="/" element={<Landing />} />
      
      {/* Páginas públicas (con SimpleNavbar integrado) */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/companias" element={<Companias />} />
      <Route path="/companias/:companyId" element={<CompanyProfilePublic />} />
      <Route path="/orientacion-vocacional" element={<OrientacionVocacional />} />
      <Route path="/suscripciones" element={<Suscripciones />} />
      <Route path="/consejos" element={<Consejos />} />
      <Route path="/cv-y-carta" element={<CVyCarta />} />
      <Route path="/entrevistas" element={<Entrevistas />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/orientacion-personalizada" element={<OrientacionPersonalizada />} />
      
      {/* Autenticación (sin navbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Páginas protegidas (con Header) */}
      <Route 
        path="/feed" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <Feed />
            </div>
          </PrivateRoute>
        } 
      />

      {/* Perfiles de usuario */}
      <Route 
        path="/perfil/:userId?" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <UserProfile />
            </div>
          </PrivateRoute>
        } 
      />

      {/* Perfiles de empresa */}
      <Route 
        path="/empresa/:companyId" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <CompanyProfile />
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      {/* Páginas sociales adicionales */}
      <Route 
        path="/red" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Mi Red</h2>
                  <p>Próximamente: Conexiones, seguidos y seguidores</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/mensajes" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Mensajes</h2>
                  <p>Próximamente: Sistema de mensajería</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      <Route 
        path="/notificaciones" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Notificaciones</h2>
                  <p>Próximamente: Notificaciones en tiempo real</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/ofertas" 
        element={
          <PrivateRoute requireAdult>
            <div className="app">
              <Header />
              <Ofertas />
            </div>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/oferta/:id" 
        element={
          <PrivateRoute requireAdult>
            <div className="app">
              <Header />
              <OfertaDetalle />
            </div>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/mis-postulaciones" 
        element={
          <PrivateRoute requireAdult>
            <div className="app">
              <Header />
              <MisPostulaciones />
            </div>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/desafios" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <Desafios />
            </div>
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/cursos" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <Cursos />
            </div>
          </PrivateRoute>
        } 
      />

      {/* Mis Cursos Inscritos */}
      <Route 
        path="/mis-cursos" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <MisCursos />
            </div>
          </PrivateRoute>
        } 
      />

      {/* Mis Desafíos */}
      <Route 
        path="/mis-desafios" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <MisDesafios />
            </div>
          </PrivateRoute>
        } 
      />

      {/* Búsqueda */}
      <Route 
        path="/buscar" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Búsqueda</h2>
                  <p>Próximamente: Búsqueda global</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      {/* Explorar */}
      <Route 
        path="/explorar/usuarios" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Explorar Usuarios</h2>
                  <p>Próximamente: Directorio completo de usuarios</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      {/* Configuración */}
      <Route 
        path="/configuracion" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <div style={{ padding: '40px', textAlign: 'center' }}>
                  <h2>Configuración</h2>
                  <p>Próximamente: Ajustes de cuenta y privacidad</p>
                </div>
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      {/* Redirecciones y 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
