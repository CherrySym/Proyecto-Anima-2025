/*
  Warnings:

  - You are about to alter the column `estado` on the `Postulacion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `tipo` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Postulacion` MODIFY `estado` ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA') NOT NULL DEFAULT 'PENDIENTE';

-- AlterTable
ALTER TABLE `User` MODIFY `tipo` ENUM('MENOR', 'MAYOR') NOT NULL;

-- CreateTable
CREATE TABLE `RecompensaUsuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `desafioId` INTEGER NULL,
    `tipoRecompensa` ENUM('PUNTOS', 'EXPERIENCIA', 'DINERO') NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecompensaUsuario` ADD CONSTRAINT `RecompensaUsuario_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecompensaUsuario` ADD CONSTRAINT `RecompensaUsuario_desafioId_fkey` FOREIGN KEY (`desafioId`) REFERENCES `Desafio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
