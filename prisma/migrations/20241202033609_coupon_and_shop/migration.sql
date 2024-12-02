/*
  Warnings:

  - A unique constraint covering the columns `[shopName]` on the table `shops` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shops_shopName_key" ON "shops"("shopName");
