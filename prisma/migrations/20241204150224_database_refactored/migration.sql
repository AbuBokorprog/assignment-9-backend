/*
  Warnings:

  - The values [REFUNDED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING,SUCCESS] on the enum `PaymentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `discount` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regular_price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `address` to the `shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registrationNumber` to the `shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopCover` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('REGULAR', 'FLASH_SALE', 'FEATURED', 'NEW', 'HOT', 'DISCOUNT');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECT', 'DELETE');

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentStatus_new" AS ENUM ('PAID', 'UNPAID', 'FAILED', 'REFUNDED');
ALTER TABLE "payments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "PaymentStatus_new" USING ("status"::text::"PaymentStatus_new");
ALTER TYPE "PaymentStatus" RENAME TO "PaymentStatus_old";
ALTER TYPE "PaymentStatus_new" RENAME TO "PaymentStatus";
DROP TYPE "PaymentStatus_old";
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'UNPAID';
COMMIT;

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'SUPER_ADMIN';

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'SUSPEND';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "postalCode" INTEGER NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "reviewStatus" "ActiveStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "isActive" "ActiveStatus" NOT NULL DEFAULT 'APPROVED';

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "paidAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'UNPAID';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "discount",
DROP COLUMN "price",
ADD COLUMN     "discount_price" DOUBLE PRECISION,
ADD COLUMN     "isActive" "ActiveStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "productStatus" "ProductStatus" NOT NULL DEFAULT 'REGULAR',
ADD COLUMN     "regular_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stockStatus" "StockStatus" NOT NULL DEFAULT 'IN_STOCK',
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "registrationNumber" TEXT NOT NULL,
ADD COLUMN     "shopCover" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SizeOption" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "SizeOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorOption" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "ColorOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recentProducts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recentProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SizeOption" ADD CONSTRAINT "SizeOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ColorOption" ADD CONSTRAINT "ColorOption_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recentProducts" ADD CONSTRAINT "recentProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recentProducts" ADD CONSTRAINT "recentProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
