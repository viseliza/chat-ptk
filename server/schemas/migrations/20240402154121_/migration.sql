-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("id");
