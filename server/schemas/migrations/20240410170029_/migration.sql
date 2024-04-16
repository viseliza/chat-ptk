/*
  Warnings:

  - A unique constraint covering the columns `[relation]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `relation` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Friend_friend_id_key";

-- DropIndex
DROP INDEX "Friend_me_id_key";

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "relation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_relation_key" ON "Friend"("relation");
