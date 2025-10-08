# 📦 Ejemplo de Estructura de Página - JobPath React

## 🎯 Ejemplo Completo: Página Home

### Estructura de Archivos

```
src/pages/Home/
├── Home.jsx         # Componente principal
└── Home.css         # Estilos específicos
```

---

## 📄 Home.jsx

```jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import './Home.css';

/**
 * Página Home - Migrado desde home/home.html
 * Muestra el contenido principal con imagen y botón de suscripción
 * Al hacer scroll, redirige a la página de jóvenes
 */
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let done = false;

    // Función que redirige a /jovenes al detectar scroll
    // Migrado desde el script inline del HTML original
    const fireOnce = () => {
      if (done) return;
      done = true;
      navigate('/jovenes');
    };

    const handleScroll = () => fireOnce();
    const handleWheel = () => fireOnce();
    const handleTouchMove = () => fireOnce();
    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', ' ', 'Spacebar'].includes(e.key)) {
        fireOnce();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // Función para ir a suscripciones - migrado del onclick del botón
  const goToSubscriptions = () => {
    navigate('/suscripciones');
  };

  return (
    <div className="home-page">
      <Header showFullNav={true} title="Job Path" />

      <main className="main-content">
        <section className="text-section">
          <h2>✨ Conozca el futuro de los jóvenes</h2>
          <p>
            A través de experiencias laborales desafiantes, los jóvenes aprenden a innovar y a crecer. 
            Cada proyecto y cada meta alcanzada les enseña a prosperar en un entorno dinámico, forjando 
            el camino hacia una carrera exitosa y llena de oportunidades.
          </p>
          <br />
          <br />
          <button onClick={goToSubscriptions} className="subscribe-btn">
            Ir a Suscripciones
          </button>
        </section>

        <section className="image-section">
          <img src="/img/img1.png" alt="futuro de los jóvenes" className="img-large" />
        </section>
      </main>
    </div>
  );
};

export default Home;
```

---

## 🎨 Home.css

```css
/* Estilos Home Page - Migrado desde home.css */
.home-page {
  min-height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background: #ffffff;
  color: #222;
}

.main-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  gap: 40px;
  background-color: #ffffff;
  min-height: calc(100vh - 80px);
}

.text-section {
  max-width: 400px;
}

.text-section h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
}

.text-section p {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #222;
}

.subscribe-btn {
  background: #fff;
  border: 1px solid #000;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  transition: background 0.3s ease;
}

.subscribe-btn:hover {
  background: #f4f4f4;
}

.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-large {
  width: 800px;
  max-width: 100%;
  border-radius: 15px;
}

/* Responsive design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
    padding: 20px;
  }

  .text-section {
    max-width: 100%;
    text-align: center;
  }

  .img-large {
    width: 100%;
  }
}
```

---

## 🔗 Cómo se Importa en AppRouter

```jsx
// src/routes/AppRouter.jsx
import Home from '../pages/Home/Home';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* ... otras rutas */}
    </Routes>
  );
};
```

---

## 📊 Comparación: Antes vs Después

### ❌ ANTES (Estructura Plana)

```
src/pages/
├── Home.jsx
├── Home.css
├── Landing.jsx
├── Landing.css
├── Login.jsx
├── Login.css
├── ... (todos mezclados)
```

**Problemas:**
- Difícil encontrar archivos relacionados
- CSS y JSX separados visualmente
- No escalable
- Difícil de mantener

### ✅ DESPUÉS (Estructura Modular)

```
src/pages/
├── Home/
│   ├── Home.jsx
│   └── Home.css
├── Landing/
│   ├── Landing.jsx
│   └── Landing.css
├── Login/
│   ├── Login.jsx
│   └── Login.css
```

**Ventajas:**
- ✅ Archivos relacionados juntos
- ✅ Fácil de encontrar y modificar
- ✅ Escalable para proyectos grandes
- ✅ Mejor organización del código
- ✅ Colocation de archivos relacionados

---

## 🎯 Patrón de Rutas de Importación

### Desde una Página (Home.jsx)
```jsx
// Componente de layout
import Header from '../../components/layout/Header/Header';

// Contextos
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

// Hooks de React Router
import { useNavigate } from 'react-router-dom';

// CSS local
import './Home.css';
```

### Desde AppRouter
```jsx
// Páginas
import Home from '../pages/Home/Home';
import Landing from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
```

### Desde Header (componente de layout)
```jsx
// Contextos
import { useLanguage } from '../../../context/LanguageContext';

// Hooks de React Router
import { Link, useLocation } from 'react-router-dom';

// CSS local
import './Header.css';
```

---

## 🚀 Crear una Nueva Página (Paso a Paso)

### 1. Crear la Estructura
```bash
mkdir src/pages/MiPagina
touch src/pages/MiPagina/MiPagina.jsx
touch src/pages/MiPagina/MiPagina.css
```

### 2. MiPagina.jsx
```jsx
import Header from '../../components/layout/Header/Header';
import './MiPagina.css';

const MiPagina = () => {
  return (
    <div className="mi-pagina">
      <Header showFullNav={true} title="Job Path" />
      <main className="main-content">
        <h1>Mi Nueva Página</h1>
        <p>Contenido aquí...</p>
      </main>
    </div>
  );
};

export default MiPagina;
```

### 3. MiPagina.css
```css
.mi-pagina {
  min-height: 100vh;
  background: white;
}

.main-content {
  padding: 40px;
  text-align: center;
}
```

### 4. Agregar a AppRouter
```jsx
// src/routes/AppRouter.jsx
import MiPagina from '../pages/MiPagina/MiPagina';

const AppRouter = () => {
  return (
    <Routes>
      {/* ... rutas existentes */}
      <Route path="/mi-pagina" element={<MiPagina />} />
    </Routes>
  );
};
```

### 5. Agregar Link en Header (opcional)
```jsx
<Link to="/mi-pagina" className={isActive('/mi-pagina') ? 'active' : ''}>
  Mi Página
</Link>
```

---

## 💡 Tips y Mejores Prácticas

### ✅ DO (Hacer)
- ✅ Mantener cada página en su propia carpeta
- ✅ Nombrar archivos igual que el componente (PascalCase)
- ✅ Usar clases CSS específicas por página
- ✅ Documentar con comentarios JSDoc
- ✅ Importar estilos al final del componente

### ❌ DON'T (No Hacer)
- ❌ No mezclar páginas y componentes
- ❌ No usar rutas relativas complejas (considera aliases)
- ❌ No duplicar estilos entre páginas
- ❌ No olvidar agregar la ruta en AppRouter
- ❌ No usar estilos globales innecesariamente

---

## 🎨 Estructura Visual

```
📁 src/pages/Home/
│
├── 📄 Home.jsx          ← Lógica y estructura del componente
│   ├── 📦 imports       (React, Router, Header, etc.)
│   ├── 🎣 hooks         (useState, useEffect, useNavigate)
│   ├── 🔧 functions     (handlers, utils)
│   └── 🎭 JSX           (return del componente)
│
└── 🎨 Home.css          ← Estilos específicos de Home
    ├── .home-page       (contenedor principal)
    ├── .main-content    (layout)
    ├── .text-section    (texto)
    ├── .image-section   (imágenes)
    └── @media           (responsive)
```

---

**Última actualización**: 7 de octubre de 2025
