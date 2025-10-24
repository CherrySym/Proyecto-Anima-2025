-- CreateTable
CREATE TABLE `cursos_guardados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `cursos_guardados_usuarioId_idx`(`usuarioId`),
    INDEX `cursos_guardados_cursoId_idx`(`cursoId`),
    UNIQUE INDEX `cursos_guardados_usuarioId_cursoId_key`(`usuarioId`, `cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cursos_guardados` ADD CONSTRAINT `cursos_guardados_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_guardados` ADD CONSTRAINT `cursos_guardados_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos_externos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
