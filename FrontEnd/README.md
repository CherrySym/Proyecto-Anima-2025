# Frontend - JobPath# JobPath Frontend 🚀



Aplicación SPA desarrollada con React 18, Vite, React Router 6 y CSS Modules.SPA moderna con React 18, Vite, React Router 6 y CSS Modules.  

**Stack:** React · Vite · Router 6 · Context API · Axios · CSS Modules · Lucide Icons

## Estructura del Proyecto

## 📁 Estructura

```

src/```

├── components/src/

│   ├── layout/          # Header, Sidebar, navegación├── components/

│   ├── common/          # Componentes reutilizables (Toast, Loading)│   ├── layout/          # Header, Sidebar, SimpleNavbar

│   └── features/        # Componentes específicos por módulo│   ├── common/          # Componentes reutilizables (Toast, Loading)

├── features/            # Organizado por funcionalidad│   └── features/        # Específicos por dominio

│   ├── autenticacion/   # Login, Register├── features/            # Organizado por módulo

│   ├── inicio/          # Dashboard, Perfil│   ├── autenticacion/   # Login, Register

│   ├── empleos/         # Ofertas, Postulaciones│   ├── inicio/          # Feed, Perfil

│   ├── desafios/        # Desafíos empresariales│   ├── empleos/         # Ofertas, Postulaciones

│   ├── cursos/          # Cursos externos│   ├── desafios/        # Challenges

│   ├── empresas/        # Perfiles de empresas│   ├── cursos/          # Courses

│   ├── recursos/        # Recursos educativos│   ├── empresas/        # Companies

│   ├── social/          # Red, Posts, Mensajes│   ├── orientacion/     # Guidance

│   └── informacion/     # Landing, About, Home│   ├── social/          # Red, Mensajes, Notificaciones

├── context/             # AuthContext, manejo de estado global│   └── informacion/     # Landing, About, Home

├── services/            # Llamadas a la API con Axios├── context/             # AuthContext, LanguageContext

├── routes/              # Configuración de rutas (AppRouter)├── services/            # API calls (axios)

└── hooks/               # Hooks personalizados├── routes/              # AppRouter

```└── hooks/               # useMinLoadingTime, etc.

```

## Instalación

---

```bash

# Instalar dependencias## �🔄 Cambios Principales de la Migración

npm install

### 1. **Navegación**

# Ejecutar en desarrollo- **Antes:** Enlaces HTML directos (`<a href="...">`)

npm run dev- **Ahora:** React Router con `<Link>` y navegación programática

```jsx

# Construir para producción// Antes (HTML)

npm run build<a href="home/home.html">PRINCIPAL</a>



# Vista previa del build// Ahora (React)

npm run preview<Link to="/home">PRINCIPAL</Link>

``````



La aplicación estará disponible en `http://localhost:5173`### 2. **Eventos y Lógica**

- **Antes:** `document.getElementById()` y `addEventListener`

## Principales Características- **Ahora:** Hooks de React (`useState`, `useEffect`, `useRef`)

```jsx

### Autenticación// Antes (JS vanilla)

Sistema de autenticación con Context API y localStorage:document.getElementById('loginForm').addEventListener('submit', ...)

```jsx

// Usar en cualquier componente// Ahora (React)

const { user, login, logout } = useAuth();const handleSubmit = (e) => { e.preventDefault(); ... }

<form onSubmit={handleSubmit}>

// Iniciar sesión```

await login(credentials);

### 3. **Estado Global**

// Cerrar sesión- **Antes:** `localStorage` con código repetido

logout();- **Ahora:** Context API centralizado

``````jsx

// AuthContext provee: user, login, logout, updateProfile

### Rutas Protegidasconst { user, login } = useAuth();

Las rutas requieren autenticación según configuración en `AppRouter.jsx````



### Gestión de Estado### 4. **Gestión de Archivos**

- Context API para autenticación y usuario global- **Antes:** Manipulación directa del DOM para imágenes

- useState y useEffect para estado local de componentes- **Ahora:** `useRef` y estado de React

- Custom hooks para lógica reutilizable```jsx

const fileInputRef = useRef(null);

### Comunicación con APIconst [publications, setPublications] = useState([]);

Servicios centralizados en `src/services/`:```

- `authService.js` - Autenticación

- `userService.js` - Usuarios### 5. **Redirecciones Automáticas**

- `ofertaService.js` - Ofertas laborales- **Antes:** `location.href = "..."`

- `postService.js` - Red social- **Ahora:** Hook `useNavigate()` de React Router

- `conexionesService.js` - Conexiones entre usuarios```jsx

const navigate = useNavigate();

## Rutas Principalesnavigate('/home');

```

| Ruta | Descripción | Requiere Auth |

|------|-------------|---------------|---

| `/` | Landing page | No |

| `/home` | Página principal | No |## 🎨 Estilos

| `/login` | Inicio de sesión | No |

| `/register` | Registro | No |Los estilos se mantienen fieles al diseño original:

| `/dashboard` | Dashboard usuario | Sí |- **Gradientes:** `linear-gradient(to right, #2d2d3f, #4f4fcf)`

| `/perfil` | Perfil usuario | Sí |- **Tipografía:** `'Segoe UI', sans-serif`

| `/empleos` | Ofertas laborales | No |- **Animaciones:** Mantenidas (bounce del arrow)

| `/empleos/mis-postulaciones` | Mis postulaciones | Sí |- **Responsive:** Preparado para mobile

| `/desafios` | Desafíos empresariales | No |

| `/cursos` | Cursos externos | No |Cada componente tiene su propio archivo CSS importado:

| `/recursos` | Recursos educativos | No |```jsx

| `/red` | Red social | Sí |import './Header.css';

```

## Estilos

---

Cada componente tiene su archivo CSS importado directamente:

```jsx## 🎯 Ventajas de la Nueva Estructura (v2.0)

import './ComponentName.css';

```### ✨ Modularidad

- Cada página/componente tiene su propia carpeta

**Características de diseño:**- CSS y JSX están juntos (colocation)

- Gradientes: `linear-gradient(to right, #2d2d3f, #4f4fcf)`- Fácil navegación entre archivos relacionados

- Tipografía: `'Segoe UI', sans-serif`

- Diseño responsive adaptado a móviles### 📈 Escalabilidad

- Animaciones CSS mantenidas del diseño original- Estructura clara para agregar nuevas páginas

- Componentes organizados por tipo (layout, common, ui)

## Stack Tecnológico- Preparado para crecimiento del proyecto



- React 18.3### 🔧 Mantenibilidad

- Vite 5.4 (build tool)- Código más fácil de encontrar y modificar

- React Router 6.26 (routing)- Mejor separación de responsabilidades

- Axios 1.12 (HTTP client)- Imports más claros y predecibles

- Lucide React (iconos)

- CSS Modules (estilos con scope)### 🚀 Performance

- Build optimizado: 236.90 kB (75.39 kB gzip)

## Estructura de Componentes- Sin errores de compilación

- Listo para producción

Los componentes siguen una estructura modular:

---

```

Feature/## 🚀 Instalación y Uso

├── ComponentName.jsx       # Componente principal

├── ComponentName.css       # Estilos específicos### Instalar dependencias

└── index.js               # Exportación (opcional)```bash

```npm install

```

## Scripts Disponibles

### Ejecutar en desarrollo

- `npm run dev` - Servidor de desarrollo con hot reload```bash

- `npm run build` - Build optimizado para producciónnpm run dev

- `npm run preview` - Preview del build de producción```

- `npm run lint` - Ejecutar ESLint

### Construir para producción

## Ventajas de la Arquitectura```bash

npm run build

**Modularidad:**```

- Componentes organizados por funcionalidad

- Fácil localización de archivos relacionados---

- CSS y JSX colocados juntos

## 📄 Rutas de la Aplicación

**Escalabilidad:**

- Estructura clara para agregar nuevas features| Ruta | Componente | Descripción |

- Separación por dominios de negocio|------|-----------|-------------|

- Preparado para crecimiento del proyecto| `/` | Landing | Página de entrada con animación |

| `/home` | Home | Contenido principal |

**Mantenibilidad:**| `/login` | Login | Formulario de inicio de sesión |

- Código fácil de encontrar y modificar| `/perfil` | Perfil | Perfil de usuario (requiere auth) |

- Separación clara de responsabilidades| `/jovenes` | Jovenes | Sección jóvenes |

- Imports predecibles y organizados| `/companias` | Companias | Sección compañías |

| `/about` | About | Acerca de |

## Configuración del Build

---

El build de producción genera archivos optimizados en `dist/`:

- HTML minificado## 🔐 Autenticación

- CSS con nombres hash para cache busting

- JavaScript minificado y dividido en chunksEl sistema usa Context API + localStorage:

- Assets optimizados

```jsx

Para servir en producción, los archivos de `dist/` deben ser servidos por un servidor web (nginx, Apache, etc.)// Login

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
