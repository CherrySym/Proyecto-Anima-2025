# 📁 Nueva Estructura del Proyecto JobPath React

## 🎯 Visión General

Este documento describe la nueva estructura organizada y escalable del proyecto, migrado desde una estructura plana a una arquitectura modular por carpetas.

## 📂 Estructura de Carpetas

```
src/
├── assets/
│   ├── images/          # Todas las imágenes del proyecto
│   │   ├── index.js     # Exportación centralizada de imágenes
│   │   └── ...          # Archivos de imágenes
│   └── react.svg        # Logo de React
│
├── components/
│   ├── common/          # Componentes reutilizables generales
│   ├── layout/          # Componentes de estructura (Header, Footer, etc.)
│   │   └── Header/
│   │       ├── Header.jsx
│   │       └── Header.css
│   └── ui/              # Componentes UI pequeños (botones, cards, etc.)
│
├── context/
│   ├── AuthContext.jsx      # Contexto de autenticación
│   └── LanguageContext.jsx  # Contexto de idioma
│
├── hooks/               # Custom hooks personalizados
│
├── pages/               # Páginas de la aplicación (cada una en su carpeta)
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── Landing/
│   │   ├── Landing.jsx
│   │   └── Landing.css
│   ├── Login/
│   │   ├── Login.jsx
│   │   └── Login.css
│   ├── Perfil/
│   │   ├── Perfil.jsx
│   │   └── Perfil.css
│   ├── Jovenes/
│   │   ├── Jovenes.jsx
│   │   └── Jovenes.css
│   ├── Companias/
│   │   ├── Companias.jsx
│   │   └── Companias.css
│   └── About/
│       ├── About.jsx
│       └── About.css
│
├── routes/
│   └── AppRouter.jsx    # Configuración centralizada de rutas
│
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## 🔧 Cómo Usar la Nueva Estructura

### Importar Páginas

Antes:
```jsx
import Home from './pages/Home';
```

Ahora:
```jsx
import Home from './pages/Home/Home';
// o desde AppRouter:
import Home from '../pages/Home/Home';
```

### Importar Componentes

Antes:
```jsx
import Header from '../components/Header';
```

Ahora:
```jsx
import Header from '../../components/layout/Header/Header';
```

### Importar Imágenes

**Opción 1: Desde public (recomendado para imágenes estáticas)**
```jsx
<img src="/img/logo.png" alt="Logo" />
```

**Opción 2: Desde assets (recomendado para imágenes que serán procesadas por Vite)**
```jsx
import { logo, img1 } from '../../assets/images';
<img src={logo} alt="Logo" />
```

### Crear una Nueva Página

1. Crear carpeta en `src/pages/NombrePagina/`
2. Crear `NombrePagina.jsx` y `NombrePagina.css`
3. Agregar la ruta en `src/routes/AppRouter.jsx`

Ejemplo:
```jsx
// src/pages/MiPagina/MiPagina.jsx
import Header from '../../components/layout/Header/Header';
import './MiPagina.css';

const MiPagina = () => {
  return (
    <div className="mi-pagina">
      <Header showFullNav={true} title="Job Path" />
      <main>
        <h1>Mi Página</h1>
      </main>
    </div>
  );
};

export default MiPagina;
```

### Crear un Nuevo Componente

**Para componentes de layout:**
```
src/components/layout/Footer/
  ├── Footer.jsx
  └── Footer.css
```

**Para componentes reutilizables:**
```
src/components/common/Card/
  ├── Card.jsx
  └── Card.css
```

**Para componentes UI pequeños:**
```
src/components/ui/Button/
  ├── Button.jsx
  └── Button.css
```

## 🎨 Convenciones de Nomenclatura

- **Carpetas de componentes/páginas**: PascalCase (`Home`, `Header`)
- **Archivos JSX**: PascalCase (`Home.jsx`, `Header.jsx`)
- **Archivos CSS**: PascalCase correspondiente (`Home.css`, `Header.css`)
- **Nombres de clases CSS**: kebab-case (`.home-page`, `.main-content`)
- **Variables y funciones**: camelCase (`handleClick`, `isActive`)

## 📝 Ejemplos de Código

### Ejemplo de Página (Home.jsx)

```jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header/Header';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica del componente
  }, [navigate]);

  return (
    <div className="home-page">
      <Header showFullNav={true} title="Job Path" />
      <main className="main-content">
        {/* Contenido */}
      </main>
    </div>
  );
};

export default Home;
```

### Ejemplo de CSS (Home.css)

```css
/* Estilos Home Page */
.home-page {
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background: #ffffff;
}

.main-content {
  display: flex;
  padding: 40px;
  gap: 40px;
}

/* Responsive design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
}
```

## ✨ Ventajas de la Nueva Estructura

1. **Modularidad**: Cada página/componente tiene su propia carpeta con sus estilos
2. **Escalabilidad**: Fácil agregar nuevas páginas y componentes
3. **Mantenibilidad**: Código más organizado y fácil de encontrar
4. **Colocation**: Los archivos relacionados están juntos
5. **Claridad**: La estructura refleja la arquitectura de la aplicación
6. **Separación de concerns**: Layout, UI y páginas están claramente separados

## 🚀 Próximos Pasos

1. ✅ Estructura de carpetas creada
2. ✅ Páginas reorganizadas
3. ✅ Header movido a layout
4. ✅ Router centralizado
5. ⏳ Crear componentes UI reutilizables (Button, Card, etc.)
6. ⏳ Agregar custom hooks en la carpeta hooks/
7. ⏳ Implementar lazy loading para las rutas
8. ⏳ Agregar tests unitarios por componente

## 📚 Recursos

- [React Router](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Best Practices](https://react.dev/)

---

**Última actualización**: Octubre 2025
**Versión**: 2.0.0
