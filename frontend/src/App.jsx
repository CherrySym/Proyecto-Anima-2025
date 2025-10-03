import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Perfil from './pages/perfil';
import Suscripciones from './pages/suscripciones';
import Companias from './pages/companias';
import Capacitaciones from './pages/Capacitaciones';
import Jovenes from './pages/jovenes';
import About from './pages/about';
import Principal from './pages/Principal';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/suscripciones" element={<Suscripciones />} />
        <Route path="/companias" element={<Companias />} />
        <Route path="/capacitaciones" element={<Capacitaciones />} />
        <Route path="/jovenes" element={<Jovenes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
