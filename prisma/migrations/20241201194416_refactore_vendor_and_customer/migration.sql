-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
