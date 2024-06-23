/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientId` to the `consultations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_telephone_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "patients" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "telephone" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consultations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" TEXT,
    "hour" TEXT,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "consultations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultations" ("data", "hour", "id") SELECT "data", "hour", "id" FROM "consultations";
DROP TABLE "consultations";
ALTER TABLE "new_consultations" RENAME TO "consultations";
CREATE UNIQUE INDEX "consultations_patientId_key" ON "consultations"("patientId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "patients_telephone_key" ON "patients"("telephone");
