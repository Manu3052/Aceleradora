/*
  Warnings:

  - You are about to drop the column `data` on the `consultations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_consultations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT,
    "hour" TEXT,
    "patientId" INTEGER NOT NULL,
    CONSTRAINT "consultations_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_consultations" ("hour", "id", "patientId") SELECT "hour", "id", "patientId" FROM "consultations";
DROP TABLE "consultations";
ALTER TABLE "new_consultations" RENAME TO "consultations";
CREATE UNIQUE INDEX "consultations_patientId_key" ON "consultations"("patientId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
