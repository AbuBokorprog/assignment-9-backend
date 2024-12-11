/*
  Warnings:

  - Added the required column `rating` to the `comparisons` table without a default value. This is not possible if the table is not empty.
  - Made the column `transactionId` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comparisons" ADD COLUMN     "rating" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "transactionId" SET NOT NULL;
