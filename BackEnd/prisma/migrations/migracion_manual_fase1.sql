-- ==========================================
-- MIGRACIÓN MANUAL MVP - FASE 1
-- Preparación y conversión de datos
-- ==========================================

-- 1. CREAR TABLAS NUEVAS TEMPORALES

-- Crear tabla usuarios con nuevo schema
CREATE TABLE IF NOT EXISTS usuarios_new (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fechaNacimiento DATETIME NOT NULL,
    tipo ENUM('ADOLESCENTE', 'JOVEN') NOT NULL,
    rol ENUM('USUARIO', 'ADMIN') DEFAULT 'USUARIO' NOT NULL,
    avatar VARCHAR(255),
    bio TEXT,
    ubicacion VARCHAR(255),
    puntos INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Crear tabla empresas con nuevo schema
CREATE TABLE IF NOT EXISTS empresas_new (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    descripcion TEXT,
    logo VARCHAR(255),
    sector VARCHAR(255),
    ubicacion VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- 2. MIGRAR DATOS DE USUARIOS (User → usuarios_new)
INSERT INTO usuarios_new (
    id,
    nombre,
    email,
    password,
    fechaNacimiento,
    tipo,
    rol,
    puntos,
    createdAt,
    updatedAt
)
SELECT 
    id,
    nombre,
    email,
    password,
    -- Calcular fechaNacimiento desde edad (aproximado: usar 1 de enero del año de nacimiento)
    DATE_SUB(CURDATE(), INTERVAL edad YEAR) as fechaNacimiento,
    -- Mantener el tipo pero ajustar ADULTO → JOVEN
    CASE 
        WHEN tipo = 'ADOLESCENTE' THEN 'ADOLESCENTE'
        WHEN tipo = 'ADULTO' THEN 'JOVEN'
        ELSE 'JOVEN'
    END as tipo,
    'USUARIO' as rol, -- Todos son usuarios por defecto
    puntos,
    NOW() as createdAt,
    NOW() as updatedAt
FROM User;

-- 3. MIGRAR DATOS DE EMPRESAS (Empresa → empresas_new)
INSERT INTO empresas_new (
    id,
    nombre,
    email,
    password,
    descripcion,
    createdAt,
    updatedAt
)
SELECT 
    id,
    nombre,
    email,
    password,
    descripcion,
    NOW() as createdAt,
    NOW() as updatedAt
FROM Empresa;

-- 4. VERIFICAR MIGRACIÓN
SELECT 'USUARIOS MIGRADOS:' as info, COUNT(*) as total FROM usuarios_new;
SELECT 'EMPRESAS MIGRADAS:' as info, COUNT(*) as total FROM empresas_new;

-- 5. MOSTRAR DATOS MIGRADOS
SELECT 
    id,
    nombre,
    email,
    YEAR(fechaNacimiento) as anio_nacimiento,
    TIMESTAMPDIFF(YEAR, fechaNacimiento, CURDATE()) as edad_calculada,
    tipo,
    rol,
    puntos
FROM usuarios_new;

SELECT 
    id,
    nombre,
    email,
    descripcion
FROM empresas_new;
