/*
  Warnings:

  - You are about to drop the column `nodeType` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `phaseId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `Phase` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `unitId` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Phase" DROP CONSTRAINT "Phase_learningPathId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_phaseId_fkey";

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "nodeType",
DROP COLUMN "phaseId",
ADD COLUMN     "unitId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Phase";

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "learningPathId" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_learningPathId_fkey" FOREIGN KEY ("learningPathId") REFERENCES "LearningPath"("id") ON DELETE CASCADE ON UPDATE CASCADE;
