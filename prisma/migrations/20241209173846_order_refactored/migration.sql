/*
  Warnings:

  - You are about to drop the column `shopId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `deliveryArea` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shopId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shopId",
ADD COLUMN     "deliveryArea" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
