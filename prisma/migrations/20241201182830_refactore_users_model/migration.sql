-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "profilePhoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "profilePhoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vendors" ALTER COLUMN "profilePhoto" DROP NOT NULL;
