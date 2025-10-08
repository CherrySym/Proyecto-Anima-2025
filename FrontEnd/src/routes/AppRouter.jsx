import { Routes, Route } from 'react-router-dom';

// Importar páginas
import Landing from '../pages/Landing/Landing';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Perfil from '../pages/Perfil/Perfil';
import Jovenes from '../pages/Jovenes/Jovenes';
import Companias from '../pages/Companias/Companias';
import About from '../pages/About/About';

/**
 * AppRouter - Configuración centralizada de rutas
 * Separado de App.jsx para mantener una mejor organización
 * Todas las rutas de la aplicación están definidas aquí
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta principal - Landing page */}
      <Route path="/" element={<Landing />} />
      
      {/* Ruta home - Página principal de contenido */}
      <Route path="/home" element={<Home />} />
      
      {/* Ruta de autenticación */}
      <Route path="/login" element={<Login />} />
      
      {/* Ruta de perfil (requiere autenticación) */}
      <Route path="/perfil" element={<Perfil />} />
      
      {/* Rutas de contenido */}
      <Route path="/jovenes" element={<Jovenes />} />
      <Route path="/companias" element={<Companias />} />
      <Route path="/about" element={<About />} />
      
      {/* Rutas placeholder para futuras páginas */}
      <Route path="/orientacion" element={<div>Orientación Vocacional</div>} />
      <Route path="/suscripciones" element={<div>Suscripciones</div>} />
      <Route path="/curriculum" element={<div>Curriculum</div>} />
    </Routes>
  );
};

export default AppRouter;
