import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRouter from './routes/AppRouter';
import './App.css';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y los contextos globales
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
