# JobPath - Aplicación React 🚀

## 📋 Descripción

Migración completa del sitio web JobPath desde HTML/CSS/JS estático a una aplicación React moderna con:
- **React Router** para navegación SPA
- **Hooks modernos** (useState, useEffect, useRef, useContext)
- **Context API** para manejo de estado global
- **Componentes funcionales** reutilizables
- **CSS modular** importado por componente
- **Estructura escalable** con arquitectura modular por carpetas

---

## 🏗️ Estructura del Proyecto (Nueva - v2.0)

```
src/
├── assets/
│   ├── images/          # Imágenes del proyecto
│   │   └── index.js     # Exportación centralizada
│   └── react.svg
├── components/
│   ├── common/          # Componentes reutilizables generales
│   ├── layout/          # Componentes de estructura
│   │   └── Header/      # Barra de navegación
│   │       ├── Header.jsx
│   │       └── Header.css
│   └── ui/              # Componentes UI pequeños
├── context/
│   ├── AuthContext.jsx      # Manejo de autenticación
│   └── LanguageContext.jsx  # Manejo de idioma
├── hooks/               # Custom hooks personalizados
├── pages/               # Páginas (cada una en su carpeta)
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
├── routes/
│   └── AppRouter.jsx    # Configuración centralizada de rutas
├── App.jsx              # Componente principal simplificado
├── App.css
├── main.jsx            # Punto de entrada
└── index.css           # Estilos globales
```

> 📚 **Documentación completa**: Ver [NUEVA_ESTRUCTURA.md](./NUEVA_ESTRUCTURA.md) para guía detallada

---

## � Documentación Adicional

- **[NUEVA_ESTRUCTURA.md](./NUEVA_ESTRUCTURA.md)** - Guía completa de la estructura modular
- **[EJEMPLO_PAGINA.md](./EJEMPLO_PAGINA.md)** - Ejemplos de código y mejores prácticas
- **[CHECKLIST_REORGANIZACION.md](./CHECKLIST_REORGANIZACION.md)** - Lista de tareas y próximos pasos
- **[RESUMEN_REORGANIZACION.md](./RESUMEN_REORGANIZACION.md)** - Resumen ejecutivo de la reorganización
- **[VISUALIZACION_ESTRUCTURA.md](./VISUALIZACION_ESTRUCTURA.md)** - Visualización gráfica del proyecto

---

## �🔄 Cambios Principales de la Migración

### 1. **Navegación**
- **Antes:** Enlaces HTML directos (`<a href="...">`)
- **Ahora:** React Router con `<Link>` y navegación programática
```jsx
// Antes (HTML)
<a href="home/home.html">PRINCIPAL</a>

// Ahora (React)
<Link to="/home">PRINCIPAL</Link>
```

### 2. **Eventos y Lógica**
- **Antes:** `document.getElementById()` y `addEventListener`
- **Ahora:** Hooks de React (`useState`, `useEffect`, `useRef`)
```jsx
// Antes (JS vanilla)
document.getElementById('loginForm').addEventListener('submit', ...)

// Ahora (React)
const handleSubmit = (e) => { e.preventDefault(); ... }
<form onSubmit={handleSubmit}>
```

### 3. **Estado Global**
- **Antes:** `localStorage` con código repetido
- **Ahora:** Context API centralizado
```jsx
// AuthContext provee: user, login, logout, updateProfile
const { user, login } = useAuth();
```

### 4. **Gestión de Archivos**
- **Antes:** Manipulación directa del DOM para imágenes
- **Ahora:** `useRef` y estado de React
```jsx
const fileInputRef = useRef(null);
const [publications, setPublications] = useState([]);
```

### 5. **Redirecciones Automáticas**
- **Antes:** `location.href = "..."`
- **Ahora:** Hook `useNavigate()` de React Router
```jsx
const navigate = useNavigate();
navigate('/home');
```

---

## 🎨 Estilos

Los estilos se mantienen fieles al diseño original:
- **Gradientes:** `linear-gradient(to right, #2d2d3f, #4f4fcf)`
- **Tipografía:** `'Segoe UI', sans-serif`
- **Animaciones:** Mantenidas (bounce del arrow)
- **Responsive:** Preparado para mobile

Cada componente tiene su propio archivo CSS importado:
```jsx
import './Header.css';
```

---

## 🎯 Ventajas de la Nueva Estructura (v2.0)

### ✨ Modularidad
- Cada página/componente tiene su propia carpeta
- CSS y JSX están juntos (colocation)
- Fácil navegación entre archivos relacionados

### 📈 Escalabilidad
- Estructura clara para agregar nuevas páginas
- Componentes organizados por tipo (layout, common, ui)
- Preparado para crecimiento del proyecto

### 🔧 Mantenibilidad
- Código más fácil de encontrar y modificar
- Mejor separación de responsabilidades
- Imports más claros y predecibles

### 🚀 Performance
- Build optimizado: 236.90 kB (75.39 kB gzip)
- Sin errores de compilación
- Listo para producción

---

## 🚀 Instalación y Uso

### Instalar dependencias
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm run dev
```

### Construir para producción
```bash
npm run build
```

---

## 📄 Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Landing | Página de entrada con animación |
| `/home` | Home | Contenido principal |
| `/login` | Login | Formulario de inicio de sesión |
| `/perfil` | Perfil | Perfil de usuario (requiere auth) |
| `/jovenes` | Jovenes | Sección jóvenes |
| `/companias` | Companias | Sección compañías |
| `/about` | About | Acerca de |

---

## 🔐 Autenticación

El sistema usa Context API + localStorage:

```jsx
// Login
const { login } = useAuth();
login({ name, lastname, email });

// Logout
const { logout } = useAuth();
logout();

// Obtener usuario actual
const { user } = useAuth();
console.log(user.name);
```

---

## ✅ Características Migradas

- ✅ Navegación con scroll automático (Landing → Home)
- ✅ Sistema de login con validación
- ✅ Perfil de usuario con edición
- ✅ Subir y mostrar imágenes (publicaciones)
- ✅ Contador de publicaciones
- ✅ Botones de idioma
- ✅ Header dinámico según página
- ✅ Logout y protección de rutas
- ✅ Diseño visual idéntico al original

---

**¡Disfruta tu aplicación React moderna! 🎉**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
