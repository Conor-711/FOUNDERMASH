-- CreateTable
CREATE TABLE "user_votes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionId" TEXT NOT NULL,
    "aSlug" TEXT NOT NULL,
    "bSlug" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "user_votes_sessionId_idx" ON "user_votes"("sessionId");

-- CreateIndex
CREATE INDEX "user_votes_winner_idx" ON "user_votes"("winner");
