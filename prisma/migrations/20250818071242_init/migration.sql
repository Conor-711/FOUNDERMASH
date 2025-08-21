-- CreateTable
CREATE TABLE "Matchup" (
    "pairKey" TEXT NOT NULL PRIMARY KEY,
    "aSlug" TEXT NOT NULL,
    "bSlug" TEXT NOT NULL,
    "votesA" INTEGER NOT NULL DEFAULT 0,
    "votesB" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE INDEX "Matchup_aSlug_bSlug_idx" ON "Matchup"("aSlug", "bSlug");
