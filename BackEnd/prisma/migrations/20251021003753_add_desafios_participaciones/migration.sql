-- CreateTable
CREATE TABLE `desafios_participaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `desafioId` INTEGER NOT NULL,
    `estado` VARCHAR(191) NOT NULL DEFAULT 'EN_PROGRESO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `desafios_participaciones_usuarioId_idx`(`usuarioId`),
    INDEX `desafios_participaciones_desafioId_idx`(`desafioId`),
    UNIQUE INDEX `desafios_participaciones_usuarioId_desafioId_key`(`usuarioId`, `desafioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `desafios_participaciones` ADD CONSTRAINT `desafios_participaciones_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `desafios_participaciones` ADD CONSTRAINT `desafios_participaciones_desafioId_fkey` FOREIGN KEY (`desafioId`) REFERENCES `desafios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
