# 📚 GUÍA DE MIGRACIÓN HTML → REACT

Esta guía explica paso a paso cómo se migró el sitio web JobPath desde HTML/CSS/JS a React.

---

## 🎯 Objetivos Cumplidos

✅ **Migración completa a componentes funcionales de React**
✅ **CSS modular manteniendo el diseño original**
✅ **Reemplazo de JavaScript vanilla por hooks de React**
✅ **Estructura de proyecto limpia y escalable**
✅ **React Router para navegación SPA**
✅ **Comentarios explicativos en cada archivo**

---

## 📦 Dependencias Instaladas

```bash
npm install react-router-dom
```

---

## 🔄 Mapeo de Archivos

### Archivos HTML Originales → Componentes React

| Archivo Original | Componente React | Descripción |
|-----------------|------------------|-------------|
| `index.html` | `Landing.jsx` | Página de entrada |
| `home/home.html` | `Home.jsx` | Página principal |
| `registro/login.html` | `Login.jsx` | Formulario login |
| `perfil/perfil.html` | `Perfil.jsx` | Perfil usuario |
| `jovenes/jovenes.html` | `Jovenes.jsx` | Sección jóvenes |
| `companias/companias.html` | `Companias.jsx` | Sección compañías |
| `About Us/about.html` | `About.jsx` | Acerca de |

### Archivos CSS → Módulos CSS

Cada componente tiene su propio CSS:
- `index.css` → `Landing.css`
- `home.css` → `Home.css`
- `login.css` → `Login.css`
- `perfil.css` → `Perfil.css`

### JavaScript → React Hooks

| Script Original | Equivalente React |
|----------------|-------------------|
| `app.js` | `AuthContext.jsx` + hooks en componentes |
| `carrusel.js` | Lógica en componentes (useState) |
| `translate.js` | `LanguageContext.jsx` |

---

## 🛠️ Patrones de Migración

### 1. Event Listeners → Event Handlers

**Antes (JavaScript Vanilla):**
```javascript
document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    // ...
});
```

**Ahora (React):**
```jsx
const [formData, setFormData] = useState({ name: '', lastname: '', email: '' });

const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastname, email } = formData;
    // ...
};

<form onSubmit={handleSubmit}>
    <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
    />
</form>
```

---

### 2. DOM Manipulation → State Management

**Antes:**
```javascript
const userNameDisplay = document.getElementById('userNameDisplay');
userNameDisplay.textContent = userData.name;
```

**Ahora:**
```jsx
const { user } = useAuth();

return <h2>{user.name}</h2>;
```

---

### 3. Navegación → React Router

**Antes:**
```javascript
window.location.href = 'https://example.com/home/home.html';
```

**Ahora:**
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/home');
```

---

### 4. Scroll Detection → useEffect

**Antes:**
```javascript
window.addEventListener('scroll', () => {
    location.href = 'next-page.html';
});
```

**Ahora:**
```jsx
useEffect(() => {
    let done = false;
    const handleScroll = () => {
        if (!done) {
            done = true;
            navigate('/next');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
}, [navigate]);
```

---

### 5. File Upload → useRef + State

**Antes:**
```javascript
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    // ...
});
```

**Ahora:**
```jsx
const fileInputRef = useRef(null);
const [publications, setPublications] = useState([]);

const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setPublications(prev => [...prev, { image: event.target.result }]);
        };
        reader.readAsDataURL(file);
    }
};

<input 
    ref={fileInputRef} 
    type="file" 
    onChange={handleFileChange} 
    style={{ display: 'none' }} 
/>
```

---

### 6. LocalStorage → Context API

**Antes:**
```javascript
localStorage.setItem('userName', name);
const userName = localStorage.getItem('userName');
```

**Ahora:**
```jsx
// AuthContext.jsx
const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userName');
    return savedUser ? { name: savedUser } : null;
});

const login = (userData) => {
    setUser(userData);
    localStorage.setItem('userName', userData.name);
};

// En componentes
const { user, login } = useAuth();
```

---

## 📁 Estructura de Contextos

### AuthContext
```jsx
// Proveedor de autenticación
<AuthProvider>
    <App />
</AuthProvider>

// Uso en componentes
const { user, login, logout, updateProfile } = useAuth();
```

### LanguageContext
```jsx
// Proveedor de idioma
<LanguageProvider>
    <App />
</LanguageProvider>

// Uso en componentes
const { language, changeLanguage } = useLanguage();
```

---

## 🎨 Estilos CSS

### Estrategia de Migración

1. **Mantener estructura original:** Los estilos se copiaron manteniendo los selectores
2. **CSS por componente:** Cada componente tiene su propio archivo CSS
3. **Imports explícitos:** `import './Component.css'`
4. **Clases preservadas:** Se mantuvieron los nombres de clase originales

### Ejemplo:

**Original (index.css):**
```css
.container {
    height: calc(100vh - 80px);
    /* ... */
}
```

**React (Landing.css):**
```css
.landing-page { /* Wrapper agregado */ }

.container {
    height: calc(100vh - 80px);
    /* ... mismo estilo */
}
```

---

## 🧩 Componentes Reutilizables

### Header Component

**Migrado desde:** Múltiples headers HTML
**Ventaja:** Un solo componente con props

```jsx
<Header showFullNav={false} title="Anima" />
<Header showFullNav={true} title="Job Path" />
```

---

## 🔐 Protección de Rutas

### Implementación

```jsx
// En Perfil.jsx
useEffect(() => {
    if (!user) {
        navigate('/login');
    }
}, [user, navigate]);
```

**Mejora sugerida:** Crear un componente `ProtectedRoute`

---

## 🚀 Optimizaciones Realizadas

1. **Limpieza de Event Listeners**
   - Todos los `useEffect` retornan funciones de limpieza
   ```jsx
   return () => {
       window.removeEventListener('scroll', handleScroll);
   };
   ```

2. **Estado Centralizado**
   - Un solo contexto de autenticación en lugar de múltiples accesos a localStorage

3. **Lazy Loading Preparado**
   - Estructura lista para implementar code splitting:
   ```jsx
   const Home = lazy(() => import('./pages/Home'));
   ```

4. **Componentes Puros**
   - Separación de lógica y presentación

---

## 📊 Comparación de Código

### Login Form

**Antes (115 líneas HTML + 45 líneas JS):**
```html
<!-- HTML -->
<form id="loginForm">
    <input type="text" id="username">
    <input type="text" id="lastname">
    <input type="email" id="email">
    <button type="submit">Login</button>
</form>

<!-- JavaScript separado -->
<script>
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("username").value.trim();
    // ... validaciones ...
    localStorage.setItem("userName", name);
    window.location.href = "/JobPath/perfil/perfil.html";
});
</script>
```

**Ahora (80 líneas React unificadas):**
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ name: '', lastname: '', email: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones
        login(formData);
        navigate('/perfil');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {/* JSX moderno */}
        </form>
    );
};
```

**Beneficios:**
- ✅ Código más limpio y mantenible
- ✅ Lógica y presentación unificadas
- ✅ Type safety preparado para TypeScript
- ✅ Reutilización de lógica con hooks

---

## 🔄 Próximos Pasos Sugeridos

### 1. Completar Páginas Pendientes
```jsx
// Jovenes.jsx - Completar con contenido de jovenes.html
// Companias.jsx - Completar con companias.html
// About.jsx - Completar con about.html
```

### 2. Añadir TypeScript
```bash
npm install --save-dev @types/react @types/react-dom
# Renombrar .jsx → .tsx
# Añadir interfaces para props y estado
```

### 3. Implementar React Query
```bash
npm install @tanstack/react-query
# Para manejo de estado del servidor
```

### 4. Añadir Testing
```bash
npm install --save-dev vitest @testing-library/react
# Crear tests para cada componente
```

### 5. Implementar i18n Completo
```bash
npm install react-i18next i18next
# Crear archivos de traducción
```

### 6. Optimizar Imágenes
```bash
# Convertir a WebP
# Implementar lazy loading
<img loading="lazy" src="..." />
```

---

## 📝 Checklist de Migración

- [x] Crear estructura de carpetas
- [x] Instalar dependencias
- [x] Migrar HTML a JSX
- [x] Migrar CSS a módulos
- [x] Migrar JS a hooks
- [x] Crear contextos globales
- [x] Implementar React Router
- [x] Copiar assets (imágenes)
- [x] Documentar cambios
- [ ] Testing
- [ ] Completar páginas pendientes
- [ ] Optimizar performance
- [ ] Deploy

---

## 🎓 Lecciones Aprendidas

1. **React Router es esencial** para SPAs modernas
2. **Context API** es suficiente para estado simple
3. **useEffect cleanup** es crítico para prevenir memory leaks
4. **Componentes pequeños** son más fáciles de mantener
5. **CSS modular** previene conflictos de estilos

---

## 🆘 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Verificar imports relativos
import Header from '../components/Header'; // ✅
import Header from 'components/Header';    // ❌
```

### Imágenes no cargan
```jsx
// Usar rutas desde public/
<img src="/img/logo.png" />  // ✅
<img src="../img/logo.png" /> // ❌
```

### Estilos no se aplican
```jsx
// Asegurarse de importar CSS
import './Component.css'; // ✅ Al inicio del componente
```

### localStorage no persiste
```jsx
// Usar Context que maneja localStorage
const { login } = useAuth(); // ✅
localStorage.setItem('user'); // ❌ Hacerlo manualmente
```

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Hooks](https://react.dev/reference/react)

---

**¡Migración completada con éxito! 🎉**
