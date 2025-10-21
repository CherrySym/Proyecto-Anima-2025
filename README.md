# 🎯 JobPath - Plataforma de Conexión Laboral para Jóvenes

[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748)](https://www.prisma.io/)

**JobPath** es una red social profesional para conectar jóvenes con empresas, con orientación vocacional, cursos, desafíos y ofertas laborales.

---

## ✨ Características

**Para Jóvenes:** Orientación vocacional, cursos, desafíos empresariales, ofertas laborales, constructor de CV, feed social  
**Para Empresas:** Publicar ofertas, crear desafíos, gestionar postulaciones, ver candidatos  
**General:** Autenticación JWT, multiidioma (ES/EN), responsive, CSS Modules

---

## 📁 Estructura

```
JobPath/
├── BackEnd/            # API REST (Node + Express + Prisma + MySQL)
│   ├── prisma/        # Schema y migraciones
│   └── src/           # Controllers, routes, middlewares
├── FrontEnd/          # SPA (React + Vite + CSS Modules)
│   └── src/
│       ├── components/   # Layout, common, features
│       ├── pages/        # Vistas organizadas por dominio
│       ├── services/     # Capa API
│       ├── context/      # Auth, Language
│       └── routes/       # AppRouter
└── JobPath-HTML/      # Legacy (HTML estático)
```

## 🚀 Instalación

**Backend:**
```bash
cd BackEnd
npm install
# Configurar .env con DATABASE_URL y JWT_SECRET
npx prisma generate && npx prisma migrate deploy
npm run dev  # → http://localhost:4000
```

**Frontend:**
```bash
cd FrontEnd
npm install
npm run dev  # → http://localhost:5173
```

## 🛠️ Tecnologías

**Frontend:** React 18 · Vite 5 · React Router 6 · CSS Modules · Axios · Lucide  
**Backend:** Node.js · Express · Prisma · MySQL · JWT · bcrypt

## 📊 Estado del Proyecto

**Completado:** ✅ Backend API · Auth JWT · CRUD completo · Feed social · Responsive · Multiidioma  
**Próximamente:** Sistema de mensajería · Notificaciones en tiempo real · Analytics para empresas

---

**Última actualización:** Enero 2025 | **Versión:** MVP 1.0
