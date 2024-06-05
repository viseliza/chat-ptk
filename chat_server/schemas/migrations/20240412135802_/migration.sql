-- CreateTable
CREATE TABLE "Replacement" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "Replacement_pkey" PRIMARY KEY ("id")
);
