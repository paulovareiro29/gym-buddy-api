-- CreateTable
CREATE TABLE "Machine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMachine" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMachine_AB_unique" ON "_CategoryToMachine"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMachine_B_index" ON "_CategoryToMachine"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToMachine" ADD CONSTRAINT "_CategoryToMachine_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMachine" ADD CONSTRAINT "_CategoryToMachine_B_fkey" FOREIGN KEY ("B") REFERENCES "Machine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
