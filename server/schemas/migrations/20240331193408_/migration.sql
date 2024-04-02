-- CreateTable
CREATE TABLE "_ProfileFriends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileFriends_AB_unique" ON "_ProfileFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileFriends_B_index" ON "_ProfileFriends"("B");

-- AddForeignKey
ALTER TABLE "_ProfileFriends" ADD CONSTRAINT "_ProfileFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileFriends" ADD CONSTRAINT "_ProfileFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
