-- CreateTable
CREATE TABLE "EloTrack" (
    "slug" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 1000,

    PRIMARY KEY ("slug", "track")
);

-- CreateIndex
CREATE INDEX "EloTrack_track_idx" ON "EloTrack"("track");
