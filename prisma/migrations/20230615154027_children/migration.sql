-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "childrenHaveEnd" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "prereqsHaveStart" BOOLEAN NOT NULL DEFAULT false;
