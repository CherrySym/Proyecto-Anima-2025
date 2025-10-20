# 🎯 JobPath - Plataforma de Conexión Laboral para Jóvenes

[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)](https://www.prisma.io/)

**JobPath** es una red social profesional diseñada para conectar jóvenes con empresas, ofreciendo herramientas de orientación vocacional, cursos, desafíos y oportunidades laborales.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Tecnologías](#-tecnologías)
- [Documentación de Migración CSS](#-documentación-de-migración-css-modules)
- [Scripts Útiles](#-scripts-útiles)
- [Contribuir](#-contribuir)
- [Estado del Proyecto](#-estado-del-proyecto)

---

## ✨ Características

### Para Jóvenes
- 🎯 **Orientación Vocacional:** Tests personalizados y recomendaciones
- 📚 **Cursos:** Catálogo de cursos para desarrollo de habilidades
- 🏆 **Desafíos:** Retos prácticos propuestos por empresas
- 💼 **Ofertas Laborales:** Búsqueda y postulación a empleos
- 📄 **Constructor de CV:** Herramienta para crear currículum y cartas
- 💡 **Consejos:** Tips para entrevistas y desarrollo profesional
- 🤝 **Red Social:** Feed, posts, comentarios, likes

### Para Empresas
- 🏢 **Perfil Empresarial:** Página de empresa con información y cultura
- 📢 **Publicar Ofertas:** Crear y gestionar ofertas de empleo
- 🎲 **Crear Desafíos:** Proponer retos para identificar talento
- 📊 **Métricas:** Estadísticas de postulaciones y engagement
- 🌟 **Visibilidad:** Directorio de empresas aliadas

### General
- 🔐 **Autenticación:** Login/registro diferenciado (Joven/Empresa)
- 🌍 **Multiidioma:** Español e Inglés
- 📱 **Responsive:** Diseño adaptable a móvil, tablet y desktop
- 🎨 **Temas:** Sistema de diseño consistente con CSS Modules

---

## 📁 Estructura del Proyecto

```
JobPath/
├── BackEnd/                 # API REST con Node.js + Express + Prisma
│   ├── prisma/             # Esquema de base de datos
│   ├── src/
│   │   ├── controllers/    # Lógica de negocio
│   │   ├── middlewares/    # Auth, validación, sanitizers
│   │   ├── routes/         # Definición de rutas
│   │   ├── utils/          # Utilidades (dateHelpers, etc)
│   │   └── server.js       # Punto de entrada
│   └── package.json
│
├── FrontEnd/                # SPA con React + Vite
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   │   ├── common/     # UI básica (Button, Card, etc)
│   │   │   ├── features/   # Componentes por dominio
│   │   │   └── layout/     # Header, Sidebar, etc
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── contexts/       # Contextos de React (Auth, Language)
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Capa de servicios API
│   │   ├── routes/         # Configuración de rutas
│   │   ├── styles/         # Estilos globales (🆕)
│   │   ├── utils/          # Utilidades (🆕)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── JobPath-HTML/            # Versión estática anterior (legacy)
│
├── docs/                    # 📚 Documentación
│   ├── README_DOCS.md      # Índice de documentación
│   ├── RESUMEN_EJECUTIVO.md
│   ├── INICIO_RAPIDO.md
│   ├── INFORME_MIGRACION_CSS_MODULES.md
│   ├── EJEMPLOS_PRACTICOS.md
│   └── ESTRUCTURA_COMPARATIVA.md
│
├── scripts/                 # 🛠️ Scripts de utilidad
│   ├── count-components.sh
│   ├── find-hardcoded-classes.sh
│   └── find-duplicate-css.sh
│
└── README.md               # Este archivo
```

---

## 🚀 Instalación

### Prerrequisitos
- Node.js 20+
- npm o yarn
- PostgreSQL (para el backend)
- Git

### Backend

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/JobPath.git
cd JobPath/BackEnd

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# 4. Generar cliente Prisma y ejecutar migraciones
npx prisma generate
npx prisma migrate deploy

# 5. (Opcional) Poblar base de datos con datos de ejemplo
node prisma/seed.js

# 6. Iniciar servidor de desarrollo
npm run dev
```

El backend estará disponible en `http://localhost:3000`

### Frontend

```bash
# 1. Ir a la carpeta del frontend
cd ../FrontEnd

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (si es necesario)
# Crear archivo .env.local con:
# VITE_API_URL=http://localhost:3000

# 4. Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

---

## 💻 Uso

### Desarrollo

```bash
# Backend (en una terminal)
cd BackEnd
npm run dev

# Frontend (en otra terminal)
cd FrontEnd
npm run dev
```

### Producción

```bash
# Backend
cd BackEnd
npm start

# Frontend
cd FrontEnd
npm run build
npm run preview
```

### Scripts Útiles

```bash
# Contar componentes y ver estadísticas
./scripts/count-components.sh

# Encontrar clases CSS hardcodeadas
./scripts/find-hardcoded-classes.sh

# Listar archivos CSS duplicados
./scripts/find-duplicate-css.sh
```

---

## 🛠️ Tecnologías

### Frontend
- **React 18.3** - Librería UI
- **Vite 5.4** - Build tool y dev server
- **React Router 6** - Navegación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **CSS Modules** - Estilos encapsulados

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Encriptación de contraseñas

---

## 📚 Documentación de Migración CSS Modules

El proyecto está en proceso de migración completa a **CSS Modules**. Toda la documentación está en la carpeta `/docs/`:

### 📖 Guías Disponibles

1. **[README_DOCS.md](./README_DOCS.md)** - Índice completo de documentación
2. **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)** - Vista general (5 min)
3. **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Para empezar hoy
4. **[INFORME_MIGRACION_CSS_MODULES.md](./INFORME_MIGRACION_CSS_MODULES.md)** - Análisis técnico completo
5. **[EJEMPLOS_PRACTICOS.md](./EJEMPLOS_PRACTICOS.md)** - Snippets y casos de uso
6. **[ESTRUCTURA_COMPARATIVA.md](./ESTRUCTURA_COMPARATIVA.md)** - Comparación visual

### 📊 Estado de la Migración

```
Progreso CSS Modules: 48%
████████████░░░░░░░░░░░░

Estado: 🟡 En progreso
Clases hardcodeadas pendientes: 64+
Archivos CSS duplicados: 38
```

**Siguiente paso:** Ver [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) para comenzar

---

## 🛠️ Scripts Útiles

### Análisis del Proyecto

```bash
# Ver estadísticas generales
./scripts/count-components.sh

# Encontrar clases que necesitan migración
./scripts/find-hardcoded-classes.sh

# Listar archivos CSS redundantes
./scripts/find-duplicate-css.sh
```

### Desarrollo

```bash
# Backend
cd BackEnd
npm run dev          # Modo desarrollo
npm start            # Modo producción
npm run migrate      # Ejecutar migraciones

# Frontend
cd FrontEnd
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linter
```

---

## 🤝 Contribuir

### Flujo de Trabajo

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Convenciones

#### Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
refactor: refactorización de código
docs: cambios en documentación
style: cambios de formato (CSS, linting)
test: agregar o modificar tests
chore: tareas de mantenimiento
```

#### Código
- **Componentes:** PascalCase (ej: `UserProfile.jsx`)
- **CSS Modules:** kebab-case (ej: `user-profile.module.css`)
- **Funciones:** camelCase (ej: `getUserData()`)
- **Constantes:** UPPER_SNAKE_CASE (ej: `API_BASE_URL`)

Ver [EJEMPLOS_PRACTICOS.md](./EJEMPLOS_PRACTICOS.md) para más detalles.

---

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Backend API REST completo
- [x] Sistema de autenticación (JWT)
- [x] CRUD de usuarios, empresas, ofertas, cursos, desafíos
- [x] Feed con posts, comentarios, likes
- [x] Diseño responsive
- [x] Multiidioma (ES/EN)
- [x] CSS Modules (48% migrado)

### 🚧 En Progreso
- [ ] Migración completa a CSS Modules (52% pendiente)
- [ ] Reorganización de estructura de carpetas
- [ ] Tests unitarios y de integración
- [ ] Documentación de API (Swagger)

### 🔮 Futuro
- [ ] Sistema de mensajería en tiempo real (WebSockets)
- [ ] Notificaciones push
- [ ] Sistema de recomendaciones (ML)
- [ ] App móvil (React Native)
- [ ] Dashboard de analytics para empresas

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👥 Equipo

- **Desarrollo Frontend:** [Tu nombre]
- **Desarrollo Backend:** [Tu nombre]
- **Diseño UI/UX:** [Tu nombre]
- **QA:** [Tu nombre]

---

## 📞 Contacto

- **Email:** contacto@jobpath.com
- **Website:** https://jobpath.com
- **GitHub:** https://github.com/tu-usuario/JobPath

---

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Prisma](https://www.prisma.io/)
- [Lucide Icons](https://lucide.dev/)
- Comunidad de código abierto

---

## 📝 Changelog

### [1.0.0] - 2025-10-20

#### Agregado
- ✨ Documentación completa de migración CSS Modules
- 🛠️ Scripts de análisis del proyecto
- 📚 Guías prácticas y ejemplos
- 🎨 Sistema de diseño con variables CSS

#### Cambiado
- ♻️ Migración a CSS Modules (48% completado)
- 📁 Preparación para reorganización de estructura

#### En Progreso
- 🚧 Migración de clases hardcodeadas
- 🚧 Eliminación de archivos CSS duplicados

---

**Última actualización:** 20 de octubre de 2025

**Versión:** 1.0.0

---

<div align="center">
  
### 🌟 Si te gusta este proyecto, dale una estrella ⭐

**Hecho con ❤️ por el equipo de JobPath**

</div>
