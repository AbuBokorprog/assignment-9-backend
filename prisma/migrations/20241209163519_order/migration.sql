/*
  Warnings:

  - Added the required column `price` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('COD', 'ADV');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentType" "PaymentType" NOT NULL DEFAULT 'COD';

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "color" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "size" TEXT;

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
