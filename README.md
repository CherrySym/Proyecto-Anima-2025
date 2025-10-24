# JobPath - Plataforma de Conexión Laboral para Jóvenes

Red social profesional diseñada para conectar jóvenes (14-25 años) con empresas. Incluye orientación vocacional, cursos externos, desafíos empresariales y ofertas laborales.

## Características Principales

**Para Jóvenes:**
- Orientación vocacional y recursos educativos
- Exploración de cursos externos recomendados
- Participación en desafíos empresariales para ganar puntos
- Postulación a ofertas laborales (usuarios mayores de 18 años)
- Red social con posts, likes y comentarios
- Sistema de conexiones con otros usuarios y empresas

**Para Empresas:**
- Publicación de ofertas laborales
- Creación de desafíos para evaluar talento
- Gestión de postulaciones recibidas
- Publicación de contenido en la red social

**General:**
- Autenticación con JWT y encriptación de contraseñas
- Interfaz responsive adaptada a dispositivos móviles
- Sistema de gamificación mediante puntos

## Estructura del Proyecto

```
JobPath/
├── BackEnd/            # API REST (Node.js + Express + Prisma + MySQL)
│   ├── prisma/         # Schema de base de datos y migraciones
│   └── src/
│       ├── controllers/    # Lógica de negocio
│       ├── routes/         # Definición de endpoints
│       └── middlewares/    # Autenticación y validaciones
├── FrontEnd/           # Aplicación SPA (React + Vite)
│   └── src/
│       ├── components/     # Componentes reutilizables
│       ├── features/       # Módulos por funcionalidad
│       ├── services/       # Comunicación con API
│       └── routes/         # Configuración de rutas
└── JobPath-HTML/       # Recursos estáticos y guías
```

## Instalación y Configuración

### Requisitos Previos
- Node.js 20 o superior
- MySQL 8.0 o superior
- npm o yarn

### Backend

```bash
cd BackEnd
npm install

# Configurar archivo .env con las siguientes variables:
# DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"
# JWT_SECRET="tu_clave_secreta"
# PORT=4000
# FRONTEND_URL="http://localhost:5173"

# Ejecutar migraciones de base de datos
npx prisma generate
npx prisma migrate deploy

# Opcional: cargar datos de prueba
npm run seed

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### Frontend

```bash
cd FrontEnd
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
npm run build
# Los archivos compilados estarán en FrontEnd/dist/
```

## Stack Tecnológico

**Frontend:**
- React 18.3
- Vite 5.4
- React Router 6.26
- Axios para peticiones HTTP
- CSS Modules para estilos

**Backend:**
- Node.js 20+
- Express 5.1
- Prisma 6.16 (ORM)
- MySQL 8.0+
- JWT para autenticación
- bcrypt para encriptación

## API Endpoints Principales

### Autenticación
- `POST /auth/register` - Registro de usuario/empresa
- `POST /auth/login` - Inicio de sesión

### Usuarios
- `GET /users/me` - Perfil del usuario autenticado
- `PUT /users/me` - Actualizar perfil

### Ofertas Laborales
- `GET /ofertas` - Listar ofertas (con filtros)
- `POST /postulaciones` - Postularse a una oferta
- `GET /postulaciones/me` - Ver mis postulaciones

### Red Social
- `GET /posts` - Feed de publicaciones
- `POST /posts` - Crear publicación
- `POST /posts/:id/like` - Dar like
- `POST /posts/:id/comentarios` - Comentar

### Desafíos
- `GET /desafios` - Listar desafíos activos
- `POST /desafios/:id/participar` - Participar en desafío

### Cursos
- `GET /cursos` - Listar cursos externos
- `POST /cursos/:id/guardar` - Guardar curso

Documentación completa de la API en `docs/DOCUMENTACION_COMPLETA_CORREGIDA.md`

## Estado Actual

Versión MVP 1.0 completado con:
- Sistema de autenticación y autorización
- CRUD completo de todas las entidades
- Red social funcional (posts, likes, comentarios)
- Sistema de ofertas y postulaciones
- Desafíos empresariales con gamificación
- Integración de cursos externos
- Sistema de conexiones entre usuarios

Funcionalidades planificadas:
- Sistema de mensajería en tiempo real
- Notificaciones push
- Panel de analytics para empresas
- Sistema de búsqueda avanzada

## Contribución

Este proyecto fue desarrollado como parte del programa Anima 2025.

Última actualización: Octubre 2025
