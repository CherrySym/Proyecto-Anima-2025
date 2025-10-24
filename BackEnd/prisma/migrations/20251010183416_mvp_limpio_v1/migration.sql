/*
  Warnings:

  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CursoExterno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Desafio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OfertaTrabajo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Postulacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecompensaUsuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CV` DROP FOREIGN KEY `CV_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Desafio` DROP FOREIGN KEY `Desafio_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `OfertaTrabajo` DROP FOREIGN KEY `OfertaTrabajo_empresaId_fkey`;

-- DropForeignKey
ALTER TABLE `Postulacion` DROP FOREIGN KEY `Postulacion_ofertaId_fkey`;

-- DropForeignKey
ALTER TABLE `Postulacion` DROP FOREIGN KEY `Postulacion_userId_fkey`;

-- DropForeignKey
ALTER TABLE `RecompensaUsuario` DROP FOREIGN KEY `RecompensaUsuario_desafioId_fkey`;

-- DropForeignKey
ALTER TABLE `RecompensaUsuario` DROP FOREIGN KEY `RecompensaUsuario_userId_fkey`;

-- DropTable
DROP TABLE `CV`;

-- DropTable
DROP TABLE `CursoExterno`;

-- DropTable
DROP TABLE `Desafio`;

-- DropTable
DROP TABLE `Empresa`;

-- DropTable
DROP TABLE `OfertaTrabajo`;

-- DropTable
DROP TABLE `Postulacion`;

-- DropTable
DROP TABLE `RecompensaUsuario`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fechaNacimiento` DATETIME(3) NOT NULL,
    `tipo` ENUM('ADOLESCENTE', 'JOVEN') NOT NULL,
    `rol` ENUM('USUARIO', 'ADMIN') NOT NULL DEFAULT 'USUARIO',
    `avatar` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `puntos` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_email_key`(`email`),
    INDEX `usuarios_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NULL,
    `logo` VARCHAR(191) NULL,
    `sector` VARCHAR(191) NULL,
    `ubicacion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `empresas_email_key`(`email`),
    INDEX `empresas_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `contenido` TEXT NOT NULL,
    `imagenUrl` VARCHAR(191) NULL,
    `usuarioId` INTEGER NULL,
    `empresaId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `posts_usuarioId_idx`(`usuarioId`),
    INDEX `posts_empresaId_idx`(`empresaId`),
    INDEX `posts_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `likes_postId_idx`(`postId`),
    UNIQUE INDEX `likes_postId_usuarioId_key`(`postId`, `usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `contenido` TEXT NOT NULL,
    `parentId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `comentarios_postId_idx`(`postId`),
    INDEX `comentarios_usuarioId_idx`(`usuarioId`),
    INDEX `comentarios_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ofertas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresaId` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `salario` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `area` VARCHAR(191) NULL,
    `modalidad` VARCHAR(191) NULL,
    `requisitos` TEXT NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,
    `fechaVencimiento` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ofertas_empresaId_idx`(`empresaId`),
    INDEX `ofertas_activa_idx`(`activa`),
    INDEX `ofertas_area_idx`(`area`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postulaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `ofertaId` INTEGER NOT NULL,
    `estado` ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA') NOT NULL DEFAULT 'PENDIENTE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `postulaciones_usuarioId_idx`(`usuarioId`),
    INDEX `postulaciones_ofertaId_idx`(`ofertaId`),
    INDEX `postulaciones_estado_idx`(`estado`),
    UNIQUE INDEX `postulaciones_usuarioId_ofertaId_key`(`usuarioId`, `ofertaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `comentarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ofertas` ADD CONSTRAINT `ofertas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postulaciones` ADD CONSTRAINT `postulaciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postulaciones` ADD CONSTRAINT `postulaciones_ofertaId_fkey` FOREIGN KEY (`ofertaId`) REFERENCES `ofertas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
