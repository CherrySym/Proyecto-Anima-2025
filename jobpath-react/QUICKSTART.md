# ⚡ QUICK START - JobPath React

## 🚀 Inicio Rápido (3 pasos)

```bash
# 1. Ir al proyecto
cd "/Users/kathy/Documents/VSC Workspace/jobpath-react"

# 2. Instalar dependencias (si no lo hiciste)
npm install

# 3. Iniciar servidor
npm run dev
```

**Abrir:** http://localhost:5173/

---

## 📱 Flujo de Usuario

### 1️⃣ Landing Page (/)
- Ver título "JobPath" con flecha animada
- Hacer scroll/tecla → redirige automáticamente a Home

### 2️⃣ Home (/home)
- Ver contenido principal con imagen
- Botón "Ir a Suscripciones"
- Hacer scroll → redirige a Jóvenes

### 3️⃣ Login (/login)
- Llenar formulario (nombre, apellido, email)
- Click "Login" → redirige a Perfil

### 4️⃣ Perfil (/perfil)
- Ver tus datos
- "Editar" → cambiar información
- "Agregar Publicación" → subir imagen
- "Cerrar Sesión" → logout

---

## 🎯 Rutas Principales

| Ruta | Qué hace |
|------|----------|
| `/` | Landing con scroll automático |
| `/home` | Página principal |
| `/login` | Formulario de ingreso |
| `/perfil` | Tu perfil (requiere login) |

---

## 🛠️ Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Linter
npm run lint
```

---

## 📁 Archivos Importantes

```
src/
├── pages/
│   ├── Landing.jsx    ← Página inicial
│   ├── Home.jsx       ← Contenido principal
│   ├── Login.jsx      ← Formulario login
│   └── Perfil.jsx     ← Perfil usuario
├── components/
│   └── Header.jsx     ← Barra navegación
├── context/
│   ├── AuthContext.jsx    ← Estado usuario
│   └── LanguageContext.jsx ← Idioma
└── App.jsx            ← Configuración rutas
```

---

## 🎨 Modificar Estilos

Cada página tiene su CSS:
```
Landing.css → Estilos de landing page
Home.css → Estilos de home
Login.css → Estilos de login
Perfil.css → Estilos de perfil
```

---

## ⚙️ Contextos Disponibles

### AuthContext
```jsx
import { useAuth } from './context/AuthContext';

const { user, login, logout, updateProfile } = useAuth();
```

### LanguageContext
```jsx
import { useLanguage } from './context/LanguageContext';

const { language, changeLanguage } = useLanguage();
```

---

## 🐛 Resolver Problemas

### El servidor no inicia
```bash
npm install
npm run dev
```

### Cambios no se reflejan
- Guardar el archivo (Cmd/Ctrl + S)
- El HMR actualiza automáticamente

### Error de importación
- Verificar rutas relativas
- Verificar extensión .jsx

---

## 📚 Documentación Completa

- `README.md` - Guía del proyecto
- `MIGRATION_GUIDE.md` - Guía técnica
- `RESUMEN.md` - Resumen completo

---

## ✅ TODO: Páginas Pendientes

Completar estas páginas con contenido:
- [ ] `src/pages/Jovenes.jsx`
- [ ] `src/pages/Companias.jsx`
- [ ] `src/pages/About.jsx`

Seguir el patrón de las páginas existentes.

---

## 🎉 ¡Listo!

**Tu aplicación React está funcionando.**

Servidor: http://localhost:5173/

**¡A desarrollar! 🚀**
