import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header/Header';
import PrivateRoute from '../components/PrivateRoute';

// Páginas públicas - INFO
import Landing from '../features/informacion/pages/Landing/Landing';
import About from '../features/informacion/pages/About/About';
import Jovenes from '../features/informacion/pages/Jovenes/Jovenes';
import JovenesInfo from '../features/informacion/pages/JovenesInfo/JovenesInfo';
import Contacto from '../features/informacion/pages/Contacto/Contacto';
import Home from '../features/informacion/pages/Home/Home';

// AUTH
import Login from '../features/autenticacion/pages/Login/Login';
import RegisterJoven from '../features/autenticacion/pages/Register/Joven/RegisterJoven';
import RegisterEmpresa from '../features/autenticacion/pages/Register/Empresa/RegisterEmpresa';

// COMPANIES
import Companias from '../features/empresas/pages/Companias/Companias';
import EmpresasInfo from '../features/empresas/pages/EmpresasInfo/EmpresasInfo';
import CompanyProfile from '../features/empresas/pages/CompanyProfile/CompanyProfile';
import CompanyProfilePublic from '../features/empresas/pages/CompanyProfilePublic/CompanyProfilePublic';

// GUIDANCE
import OrientacionPersonalizada from '../features/orientacion/pages/OrientacionPersonalizada/OrientacionPersonalizada';

// CAREER
import Curriculum from '../features/trayectoria/pages/Curriculum/Curriculum';

// SUBSCRIPTION
import Suscripciones from '../features/suscripciones/pages/Suscripciones/Suscripciones';
import Pago from '../features/suscripciones/pages/Pago/Pago';

// FEED
import Feed from '../features/inicio/pages/Feed/Feed';
import UserProfile from '../features/inicio/pages/Perfil/UserProfile';

// JOBS
import Ofertas from '../features/empleos/pages/Ofertas/Ofertas';
import OfertaDetalle from '../features/empleos/pages/OfertaDetalle/OfertaDetalle';
import MisPostulaciones from '../features/empleos/pages/MisPostulaciones/MisPostulaciones';

// CHALLENGES
import Desafios from '../features/desafios/pages/Desafios/Desafios';
import DesafioDetalle from '../features/desafios/pages/DesafioDetalle/DesafioDetalle';
import MisDesafios from '../features/desafios/pages/MisDesafios/MisDesafios';

// COURSES
import Cursos from '../features/cursos/pages/Cursos/Cursos';
import MisCursos from '../features/cursos/pages/MisCursos/MisCursos';

// SOCIAL (nuevas páginas completas)
import Red from '../features/social/pages/Red/Red';
import Mensajes from '../features/social/pages/Mensajes/Mensajes';
import Notificaciones from '../features/social/pages/Notificaciones/Notificaciones';
// import Busqueda from '../features/social/pages/Busqueda/Busqueda'; // REMOVIDO PARA MVP
import Configuracion from '../features/social/pages/Configuracion/Configuracion';

// RECURSOS
import Recursos from '../features/recursos/Recursos';

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
      
      {/* Páginas informativas para tipos de usuario */}
      <Route path="/jovenes-info" element={<JovenesInfo />} />
      <Route path="/empresas-info" element={<EmpresasInfo />} />
      
      {/* Páginas públicas (con SimpleNavbar integrado) */}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/companias" element={<Companias />} />
      <Route path="/companias/:companyId" element={<CompanyProfilePublic />} />
      <Route path="/jovenes" element={<Jovenes />} />
      <Route path="/suscripciones" element={<Suscripciones />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/pago" element={<Pago />} />
      <Route path="/orientacion-personalizada" element={<OrientacionPersonalizada />} />
      
      {/* Autenticación (sin navbar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-joven" element={<RegisterJoven />} />
      <Route path="/register-empresa" element={<RegisterEmpresa />} />

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

      {/* Páginas sociales funcionales */}
      <Route 
        path="/red" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <Red />
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
                <Mensajes />
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
                <Notificaciones />
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
        path="/desafio/:id" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <DesafioDetalle />
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

      {/* Búsqueda funcional - REMOVIDO PARA MVP */}
      {/* <Route 
        path="/buscar" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <Busqueda />
              </main>
            </div>
          </PrivateRoute>
        } 
      /> */}

      {/* Configuración funcional */}
      <Route 
        path="/configuracion" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <Configuracion />
              </main>
            </div>
          </PrivateRoute>
        } 
      />

      {/* Recursos para ti */}
      <Route 
        path="/recursos/:seccion?" 
        element={
          <PrivateRoute>
            <div className="app">
              <Header />
              <main className="main-content">
                <Recursos />
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
