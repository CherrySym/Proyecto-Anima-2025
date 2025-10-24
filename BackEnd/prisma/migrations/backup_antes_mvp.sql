-- ==========================================
-- BACKUP ANTES DE MIGRACIÓN MVP
-- Fecha: 2025-10-10
-- ==========================================

-- Backup de usuarios (tabla User)
CREATE TABLE IF NOT EXISTS User_backup AS SELECT * FROM User;

-- Backup de empresas (tabla Empresa)
CREATE TABLE IF NOT EXISTS Empresa_backup AS SELECT * FROM Empresa;

-- Backup de ofertas (tabla OfertaTrabajo)
CREATE TABLE IF NOT EXISTS OfertaTrabajo_backup AS SELECT * FROM OfertaTrabajo;

-- Backup de postulaciones (tabla Postulacion)
CREATE TABLE IF NOT EXISTS Postulacion_backup AS SELECT * FROM Postulacion;

-- Ver datos de usuarios antes de migrar
SELECT 
    id,
    nombre,
    email,
    edad,
    tipo,
    puntos
FROM User;

-- Ver datos de empresas antes de migrar
SELECT 
    id,
    nombre,
    email
FROM Empresa;
