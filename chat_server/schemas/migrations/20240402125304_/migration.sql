/*
  Warnings:

  - You are about to drop the `_ProfileFriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('friends', 'subscribeTo', 'subscribeOnMe');

-- DropForeignKey
ALTER TABLE "_ProfileFriends" DROP CONSTRAINT "_ProfileFriends_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileFriends" DROP CONSTRAINT "_ProfileFriends_B_fkey";

-- DropTable
DROP TABLE "_ProfileFriends";

-- CreateTable
CREATE TABLE "Friend" (
    "me_id" INTEGER NOT NULL,
    "friend_id" INTEGER NOT NULL,
    "status" "FriendStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Friend_me_id_key" ON "Friend"("me_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_friend_id_key" ON "Friend"("friend_id");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_me_id_fkey" FOREIGN KEY ("me_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
