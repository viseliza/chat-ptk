-- AlterEnum
ALTER TYPE "FriendStatus" ADD VALUE 'blackList';

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_friend_id_fkey";

-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_me_id_fkey";
