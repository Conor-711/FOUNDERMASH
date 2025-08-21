-- CreateTable
CREATE TABLE "submissions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "founder" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT,
    "story" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
