import { createContext, useContext, useState } from 'react';

// Context para manejar el idioma de la aplicación
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Estado del idioma, por defecto español
  const [language, setLanguage] = useState('es');

  // Función para cambiar el idioma
  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Aquí podrías integrar con i18n si necesitas traducciones más complejas
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};
