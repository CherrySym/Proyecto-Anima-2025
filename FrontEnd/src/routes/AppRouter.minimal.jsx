import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componente de prueba muy simple
const TestPage = () => (
  <div style={{ 
    padding: '40px', 
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh'
  }}>
    <h1>🎉 ¡FUNCIONA!</h1>
    <p>Si ves esto, React Router está funcionando correctamente</p>
    <p>Timestamp: {new Date().toLocaleTimeString()}</p>
  </div>
);

const AppRouterMinimal = () => {
  console.log('🚀 AppRouterMinimal ejecutándose...');
  
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<TestPage />} />
      </Routes>
    </div>
  );
};

export default AppRouterMinimal;