import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRouter from './routes/AppRouter';
import './App.css';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y los contextos globales
 * Migrado desde el sitio web estático HTML a una SPA con React Router
 * Las rutas están centralizadas en AppRouter para mejor organización
 */
function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
