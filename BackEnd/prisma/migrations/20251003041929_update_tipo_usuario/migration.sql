/*
  Warnings:

  - The values [MENOR,MAYOR] on the enum `User_tipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `tipo` ENUM('ADOLESCENTE', 'ADULTO') NOT NULL;
