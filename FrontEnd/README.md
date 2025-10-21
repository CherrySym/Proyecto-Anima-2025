# JobPath Frontend 🚀

SPA moderna con React 18, Vite, React Router 6 y CSS Modules.  
**Stack:** React · Vite · Router 6 · Context API · Axios · CSS Modules · Lucide Icons

## 📁 Estructura

```
src/
├── components/
│   ├── layout/          # Header, Sidebar, SimpleNavbar
│   ├── common/          # Componentes reutilizables (Toast, Loading)
│   └── features/        # Específicos por dominio
├── features/            # Organizado por módulo
│   ├── autenticacion/   # Login, Register
│   ├── inicio/          # Feed, Perfil
│   ├── empleos/         # Ofertas, Postulaciones
│   ├── desafios/        # Challenges
│   ├── cursos/          # Courses
│   ├── empresas/        # Companies
│   ├── orientacion/     # Guidance
│   ├── social/          # Red, Mensajes, Notificaciones
│   └── informacion/     # Landing, About, Home
├── context/             # AuthContext, LanguageContext
├── services/            # API calls (axios)
├── routes/              # AppRouter
└── hooks/               # useMinLoadingTime, etc.
```

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
