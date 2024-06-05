-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "monday" TEXT[],
    "tuesday" TEXT[],
    "wednesday" TEXT[],
    "thursday" TEXT[],
    "friday" TEXT[],
    "saturday" TEXT[],

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_group_id_key" ON "Schedule"("group_id");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
