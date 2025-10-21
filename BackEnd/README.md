# 🚀 Backend - JobPath

API REST con Node.js, Express, Prisma y MySQL.  
**Stack:** Node.js · Express · Prisma ORM · MySQL · JWT · bcrypt

## 📋 Requisitos

- Node.js 18+
- MySQL 8+
- npm o yarn

## 🛠️ Instalación

```bash
npm install

# Crear .env con:
# DATABASE_URL="mysql://usuario:password@localhost:3306/jobpath_db"
# JWT_SECRET="tu_secret"
# PORT=4000

mysql -u root -p
CREATE DATABASE jobpath_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

npx prisma generate
npx prisma migrate deploy
node prisma/seed.js  # Opcional: datos de prueba

npm run dev  # → http://localhost:4000
```

## 🧪 Probar la conexión

Visita `http://localhost:4000/test-db` para verificar que la conexión a la base de datos funciona correctamente.

## 📚 API Endpoints

### Autenticación
- `POST /auth/register` - Registrar usuario o empresa
- `POST /auth/login` - Iniciar sesión
- `GET /auth/me` - Obtener usuario actual (requiere token)

### Usuarios
- `GET /users` - Listar usuarios (con filtros)
- `GET /users/:id` - Obtener usuario por ID
- `PUT /users/:id` - Actualizar usuario (requiere auth)
- `DELETE /users/:id` - Eliminar usuario (requiere auth)
- `GET /users/ranking` - Top usuarios por puntos

### Empresas
- `GET /empresas` - Listar empresas (con filtros)
- `GET /empresas/:id` - Obtener empresa por ID
- `PUT /empresas/:id` - Actualizar empresa (requiere auth)
- `DELETE /empresas/:id` - Eliminar empresa (requiere auth)

### Posts (Red Social)
- `GET /posts` - Listar posts del feed (con paginación)
- `GET /posts/:id` - Obtener post por ID
- `POST /posts` - Crear post (requiere auth)
- `PUT /posts/:id` - Actualizar post (requiere auth)
- `DELETE /posts/:id` - Eliminar post (requiere auth)
- `GET /posts/usuario/:usuarioId` - Posts de un usuario
- `GET /posts/empresa/:empresaId` - Posts de una empresa

### Likes
- `POST /likes/toggle` - Dar/quitar like a un post (requiere auth)
- `GET /likes/post/:postId` - Obtener likes de un post
- `GET /likes/check/:postId` - Verificar si usuario dio like (requiere auth)
- `GET /likes/user/:usuarioId` - Posts con like de un usuario

### Comentarios
- `GET /comentarios/post/:postId` - Obtener comentarios de un post
- `GET /comentarios/:id` - Obtener comentario por ID
- `POST /comentarios` - Crear comentario (requiere auth)
- `PUT /comentarios/:id` - Actualizar comentario (requiere auth)
- `DELETE /comentarios/:id` - Eliminar comentario (requiere auth)
- `GET /comentarios/usuario/:usuarioId` - Comentarios de un usuario

### Ofertas Laborales
- `GET /ofertas` - Listar ofertas (con filtros por área, tipo, modalidad)
- `GET /ofertas/:id` - Obtener oferta por ID
- `POST /ofertas` - Crear oferta (requiere auth empresa)
- `PUT /ofertas/:id` - Actualizar oferta (requiere auth empresa)
- `DELETE /ofertas/:id` - Desactivar oferta (requiere auth empresa)

### Postulaciones
- `POST /postulaciones` - Crear postulación (requiere auth, +18 años)
- `GET /postulaciones` - Listar todas las postulaciones
- `GET /postulaciones/mis-postulaciones` - Mis postulaciones (requiere auth)
- `GET /postulaciones/oferta/:ofertaId` - Postulaciones de una oferta (requiere auth empresa)
- `PUT /postulaciones/:id` - Actualizar estado (requiere auth empresa)
- `DELETE /postulaciones/:id` - Eliminar postulación (requiere auth)

## 🗄️ Modelos de la Base de Datos

### Usuario
- Jóvenes entre 14-25 años
- Tipos: ADOLESCENTE (<18) o JOVEN (18-25)
- Roles: USUARIO o ADMIN
- Sistema de puntos para gamificación

### Empresa
- Organizaciones que publican ofertas
- Perfil con logo, sector, ubicación

### Post
- Publicaciones en el feed
- Autor polimórfico (Usuario o Empresa)
- Soporta imagen opcional

### Like
- Un usuario puede dar un like por post
- Constraint único

### Comentario
- Comentarios en posts
- Soporta respuestas anidadas (parentId)
- Solo usuarios pueden comentar

### Oferta
- Ofertas laborales publicadas por empresas
- Filtros: área, tipo, modalidad
- Soft delete (campo activa)

### Postulacion
- Usuario aplica a oferta
- Estados: PENDIENTE, ACEPTADA, RECHAZADA
- Solo mayores de 18 años

## 📝 Credenciales de Prueba

Después de ejecutar `npm run seed`, puedes usar estas credenciales:

**Usuarios:**
- `maria@example.com` / `password123` (23 años, JOVEN)
- `carlos@example.com` / `password123` (22 años, JOVEN)
- `ana@example.com` / `password123` (17 años, ADOLESCENTE)
- `admin@nexo.com` / `password123` (ADMIN)

**Empresas:**
- `rrhh@globant.com` / `password123`
- `careers@mercadolibre.com` / `password123`
- `trabajo@conaprole.com.uy` / `password123`

## 🔧 Scripts Disponibles

- `npm run dev` - Iniciar servidor en modo desarrollo
- `npm start` - Iniciar servidor en modo producción
- `npm run migrate` - Ejecutar migraciones de Prisma
- `npm run generate` - Generar cliente Prisma
- `npm run seed` - Poblar BD con datos de prueba
- `npm run reset` - Resetear BD y ejecutar seed

## 🐛 Troubleshooting

### Error de conexión a MySQL
```
Error: P1001: Can't reach database server
```
**Solución:** Verifica que MySQL esté corriendo y las credenciales en `.env` sean correctas.

### Error: `prisma.usuario` is not a function
```
PrismaClientValidationError
```
**Solución:** Ejecuta `npm run generate` para regenerar el cliente de Prisma.

### Error: Missing required argument
**Solución:** Verifica que todos los campos obligatorios estén incluidos en la petición.

## 📚 Documentación Adicional

- [Prisma Docs](https://www.prisma.io/docs/)
- [Express Docs](https://expressjs.com/)
- [JWT Docs](https://jwt.io/)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del MVP académico de Nexo (JobPath).
