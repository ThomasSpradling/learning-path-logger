/*
  Warnings:

  - Added the required column `backdrop` to the `LearningPath` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complete` to the `LearningPath` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LearningPath" ADD COLUMN     "backdrop" TEXT NOT NULL,
ADD COLUMN     "complete" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Phase" ALTER COLUMN "order" DROP NOT NULL;
