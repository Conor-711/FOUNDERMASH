-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Elo" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL DEFAULT 1000
);
INSERT INTO "new_Elo" ("rating", "slug") SELECT "rating", "slug" FROM "Elo";
DROP TABLE "Elo";
ALTER TABLE "new_Elo" RENAME TO "Elo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
