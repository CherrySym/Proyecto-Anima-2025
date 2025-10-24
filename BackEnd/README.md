# Backend - JobPath# 🚀 Backend - JobPath



API REST desarrollada con Node.js, Express y Prisma ORM sobre MySQL.API REST con Node.js, Express, Prisma y MySQL.  

**Stack:** Node.js · Express · Prisma ORM · MySQL · JWT · bcrypt

## Requisitos

## 📋 Requisitos

- Node.js 18 o superior

- MySQL 8 o superior- Node.js 18+

- npm (incluido con Node.js)- MySQL 8+

- npm o yarn

## Instalación

## 🛠️ Instalación

```bash

# Instalar dependencias```bash

npm installnpm install



# Configurar variables de entorno# Crear .env con:

cp .env.example .env# DATABASE_URL="mysql://usuario:password@localhost:3306/jobpath_db"

# Editar .env con tus credenciales:# JWT_SECRET="tu_secret"

# DATABASE_URL="mysql://user:password@localhost:3306/jobpath"# PORT=4000

# JWT_SECRET="tu-secreto-jwt-seguro"

# PORT=4000mysql -u root -p

# FRONTEND_URL="http://localhost:5173"CREATE DATABASE jobpath_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

EXIT;

# Crear la base de datos en MySQL

mysql -u root -pnpx prisma generate

CREATE DATABASE jobpath;npx prisma migrate deploy

node prisma/seed.js  # Opcional: datos de prueba

# Generar cliente Prisma

npx prisma generatenpm run dev  # → http://localhost:4000

```

# Ejecutar migraciones

npx prisma migrate deploy## 🧪 Probar la conexión



# Poblar con datos inicialesVisita `http://localhost:4000/test-db` para verificar que la conexión a la base de datos funciona correctamente.

npm run seed

## 📚 API Endpoints

# Iniciar servidor de desarrollo

npm run dev### Autenticación

```- `POST /auth/register` - Registrar usuario o empresa

- `POST /auth/login` - Iniciar sesión

El servidor estará disponible en `http://localhost:4000`- `GET /auth/me` - Obtener usuario actual (requiere token)



## Scripts Disponibles### Usuarios

- `GET /users` - Listar usuarios (con filtros)

- `npm run dev` - Servidor con nodemon (reinicio automático)- `GET /users/:id` - Obtener usuario por ID

- `npm start` - Servidor en producción- `PUT /users/:id` - Actualizar usuario (requiere auth)

- `npx prisma migrate dev` - Crear y aplicar migración- `DELETE /users/:id` - Eliminar usuario (requiere auth)

- `npx prisma generate` - Regenerar cliente Prisma- `GET /users/ranking` - Top usuarios por puntos

- `npm run seed` - Ejecutar seed de datos

- `npx prisma studio` - Interfaz visual de base de datos### Empresas

- `npx prisma migrate reset` - Resetear base de datos (desarrollo)- `GET /empresas` - Listar empresas (con filtros)

- `GET /empresas/:id` - Obtener empresa por ID

## Estructura de la API- `PUT /empresas/:id` - Actualizar empresa (requiere auth)

- `DELETE /empresas/:id` - Eliminar empresa (requiere auth)

### Autenticación

- `POST /api/auth/register` - Registrar usuario o empresa### Posts (Red Social)

- `POST /api/auth/login` - Iniciar sesión (JWT)- `GET /posts` - Listar posts del feed (con paginación)

- `GET /posts/:id` - Obtener post por ID

### Usuarios- `POST /posts` - Crear post (requiere auth)

- `GET /api/users` - Listar usuarios- `PUT /posts/:id` - Actualizar post (requiere auth)

- `GET /api/users/:id` - Obtener usuario por ID- `DELETE /posts/:id` - Eliminar post (requiere auth)

- `PUT /api/users/:id` - Actualizar usuario- `GET /posts/usuario/:usuarioId` - Posts de un usuario

- `DELETE /api/users/:id` - Eliminar usuario- `GET /posts/empresa/:empresaId` - Posts de una empresa



### Empresas### Likes

- `GET /api/empresas` - Listar empresas- `POST /likes/toggle` - Dar/quitar like a un post (requiere auth)

- `GET /api/empresas/:id` - Obtener empresa por ID- `GET /likes/post/:postId` - Obtener likes de un post

- `PUT /api/empresas/:id` - Actualizar empresa- `GET /likes/check/:postId` - Verificar si usuario dio like (requiere auth)

- `GET /likes/user/:usuarioId` - Posts con like de un usuario

### Posts (Red Social)

- `GET /api/posts` - Listar posts### Comentarios

- `GET /api/posts/:id` - Obtener post por ID- `GET /comentarios/post/:postId` - Obtener comentarios de un post

- `POST /api/posts` - Crear post (requiere auth)- `GET /comentarios/:id` - Obtener comentario por ID

- `PUT /api/posts/:id` - Actualizar post- `POST /comentarios` - Crear comentario (requiere auth)

- `DELETE /api/posts/:id` - Eliminar post- `PUT /comentarios/:id` - Actualizar comentario (requiere auth)

- `DELETE /comentarios/:id` - Eliminar comentario (requiere auth)

### Likes- `GET /comentarios/usuario/:usuarioId` - Comentarios de un usuario

- `POST /api/likes` - Dar like a un post

- `DELETE /api/likes/:postId` - Quitar like### Ofertas Laborales

- `GET /ofertas` - Listar ofertas (con filtros por área, tipo, modalidad)

### Comentarios- `GET /ofertas/:id` - Obtener oferta por ID

- `GET /api/comentarios/post/:postId` - Obtener comentarios de un post- `POST /ofertas` - Crear oferta (requiere auth empresa)

- `POST /api/comentarios` - Crear comentario- `PUT /ofertas/:id` - Actualizar oferta (requiere auth empresa)

- `DELETE /api/comentarios/:id` - Eliminar comentario- `DELETE /ofertas/:id` - Desactivar oferta (requiere auth empresa)



### Ofertas Laborales### Postulaciones

- `GET /api/ofertas` - Listar ofertas- `POST /postulaciones` - Crear postulación (requiere auth, +18 años)

- `GET /api/ofertas/:id` - Obtener oferta por ID- `GET /postulaciones` - Listar todas las postulaciones

- `POST /api/ofertas` - Crear oferta (empresas)- `GET /postulaciones/mis-postulaciones` - Mis postulaciones (requiere auth)

- `PUT /api/ofertas/:id` - Actualizar oferta- `GET /postulaciones/oferta/:ofertaId` - Postulaciones de una oferta (requiere auth empresa)

- `DELETE /api/ofertas/:id` - Eliminar oferta- `PUT /postulaciones/:id` - Actualizar estado (requiere auth empresa)

- `DELETE /postulaciones/:id` - Eliminar postulación (requiere auth)

### Postulaciones

- `GET /api/postulaciones/usuario/:userId` - Postulaciones del usuario## 🗄️ Modelos de la Base de Datos

- `GET /api/postulaciones/oferta/:ofertaId` - Postulaciones de una oferta

- `POST /api/postulaciones` - Crear postulación (solo mayores 18)### Usuario

- `PUT /api/postulaciones/:id/estado` - Actualizar estado- Jóvenes entre 14-25 años

- Tipos: ADOLESCENTE (<18) o JOVEN (18-25)

### Desafíos- Roles: USUARIO o ADMIN

- `GET /api/desafios` - Listar desafíos- Sistema de puntos para gamificación

- `GET /api/desafios/:id` - Obtener desafío por ID

- `POST /api/desafios` - Crear desafío (empresas)### Empresa

- `POST /api/desafios/:id/participar` - Participar en desafío- Organizaciones que publican ofertas

- Perfil con logo, sector, ubicación

### Cursos Externos

- `GET /api/cursos` - Listar cursos### Post

- `POST /api/cursos` - Agregar curso externo- Publicaciones en el feed

- `POST /api/cursos/:id/guardar` - Guardar curso (usuario)- Autor polimórfico (Usuario o Empresa)

- Soporta imagen opcional

### Conexiones

- `GET /api/conexiones/:userId` - Conexiones de un usuario### Like

- `POST /api/conexiones` - Seguir a otro usuario- Un usuario puede dar un like por post

- `DELETE /api/conexiones/:id` - Dejar de seguir- Constraint único



### Empresas Seguidas### Comentario

- `GET /api/empresas-seguidas/:userId` - Empresas que sigue un usuario- Comentarios en posts

- `POST /api/empresas-seguidas` - Seguir empresa- Soporta respuestas anidadas (parentId)

- `DELETE /api/empresas-seguidas/:empresaId` - Dejar de seguir- Solo usuarios pueden comentar



## Modelos de Base de Datos### Oferta

- Ofertas laborales publicadas por empresas

Los modelos principales están definidos en `prisma/schema.prisma`:- Filtros: área, tipo, modalidad

- Soft delete (campo activa)

- **Usuario**: Información de usuarios (ADOLESCENTE o JOVEN), con rol (USUARIO o ADMIN), incluye sistema de puntos

- **Empresa**: Perfiles de empresas con información corporativa### Postulacion

- **Post**: Publicaciones de usuarios o empresas (polimórfico)- Usuario aplica a oferta

- **Like**: Likes en posts- Estados: PENDIENTE, ACEPTADA, RECHAZADA

- **Comentario**: Comentarios en posts- Solo mayores de 18 años

- **Oferta**: Ofertas laborales (solo visibles para mayores de 18)

- **Postulacion**: Postulaciones de usuarios a ofertas## 📝 Credenciales de Prueba

- **Desafio**: Desafíos empresariales con sistema de participación

- **DesafioParticipacion**: Relación usuario-desafíoDespués de ejecutar `npm run seed`, puedes usar estas credenciales:

- **CursoExterno**: Cursos de plataformas externas

- **CursoGuardado**: Relación usuario-curso**Usuarios:**

- **Conexion**: Seguimiento entre usuarios- `maria@example.com` / `password123` (23 años, JOVEN)

- **EmpresaSeguida**: Seguimiento de empresas por usuarios- `carlos@example.com` / `password123` (22 años, JOVEN)

- `ana@example.com` / `password123` (17 años, ADOLESCENTE)

## Credenciales del Seed- `admin@nexo.com` / `password123` (ADMIN)



El script `prisma/seed.js` crea usuarios y empresas de prueba:**Empresas:**

- `rrhh@globant.com` / `password123`

**Usuarios:**- `careers@mercadolibre.com` / `password123`

- maria@example.com / password123- `trabajo@conaprole.com.uy` / `password123`

- carlos@example.com / password123

- ana@example.com / password123## 🔧 Scripts Disponibles



**Empresas:**- `npm run dev` - Iniciar servidor en modo desarrollo

- rrhh@globant.com / password123- `npm start` - Iniciar servidor en modo producción

- rrhh@mercadolibre.com / password123- `npm run migrate` - Ejecutar migraciones de Prisma

- `npm run generate` - Generar cliente Prisma

## Solución de Problemas Comunes- `npm run seed` - Poblar BD con datos de prueba

- `npm run reset` - Resetear BD y ejecutar seed

**Error de conexión a MySQL:**

```## 🐛 Troubleshooting

Verifica que MySQL esté corriendo: sudo service mysql status

Verifica las credenciales en .env### Error de conexión a MySQL

``````

Error: P1001: Can't reach database server

**Error de Prisma Client:**```

```bash**Solución:** Verifica que MySQL esté corriendo y las credenciales en `.env` sean correctas.

npx prisma generate

```### Error: `prisma.usuario` is not a function

```

**Las migraciones fallan:**PrismaClientValidationError

```bash```

# Resetear base de datos (desarrollo)**Solución:** Ejecuta `npm run generate` para regenerar el cliente de Prisma.

npx prisma migrate reset

```### Error: Missing required argument

**Solución:** Verifica que todos los campos obligatorios estén incluidos en la petición.

**Puerto 4000 ocupado:**

```## 📚 Documentación Adicional

Cambia el PORT en .env o cierra la aplicación que usa el puerto

```- [Prisma Docs](https://www.prisma.io/docs/)

- [Express Docs](https://expressjs.com/)

## Stack Tecnológico- [JWT Docs](https://jwt.io/)



- Node.js 20+## 🤝 Contribuir

- Express 5.1

- Prisma 6.16 (ORM)1. Fork el proyecto

- MySQL 8+2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)

- JWT 9.0 (autenticación)3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)

- bcrypt 6.0 (hash de contraseñas)4. Push a la rama (`git push origin feature/AmazingFeature`)

- CORS (middleware)5. Abre un Pull Request


## 📄 Licencia

Este proyecto es parte del MVP académico de Nexo (JobPath).
