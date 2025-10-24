-- CreateTable
CREATE TABLE `empresas_seguidas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `empresas_seguidas_usuarioId_idx`(`usuarioId`),
    INDEX `empresas_seguidas_empresaId_idx`(`empresaId`),
    UNIQUE INDEX `empresas_seguidas_usuarioId_empresaId_key`(`usuarioId`, `empresaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empresas_seguidas` ADD CONSTRAINT `empresas_seguidas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empresas_seguidas` ADD CONSTRAINT `empresas_seguidas_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `empresas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
