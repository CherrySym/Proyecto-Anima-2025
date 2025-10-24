-- CreateTable
CREATE TABLE `conexiones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seguidorId` INTEGER NOT NULL,
    `seguidoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `conexiones_seguidorId_idx`(`seguidorId`),
    INDEX `conexiones_seguidoId_idx`(`seguidoId`),
    UNIQUE INDEX `conexiones_seguidorId_seguidoId_key`(`seguidorId`, `seguidoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conexiones` ADD CONSTRAINT `conexiones_seguidorId_fkey` FOREIGN KEY (`seguidorId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conexiones` ADD CONSTRAINT `conexiones_seguidoId_fkey` FOREIGN KEY (`seguidoId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
