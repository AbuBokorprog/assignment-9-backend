/*
  Warnings:

  - You are about to drop the `cart-items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart-items" DROP CONSTRAINT "cart-items_cartId_fkey";

-- DropForeignKey
ALTER TABLE "cart-items" DROP CONSTRAINT "cart-items_productId_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "cart-items";

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
