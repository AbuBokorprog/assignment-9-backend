/*
  Warnings:

  - Added the required column `qty` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "color" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "qty" INTEGER NOT NULL,
ADD COLUMN     "size" TEXT;
