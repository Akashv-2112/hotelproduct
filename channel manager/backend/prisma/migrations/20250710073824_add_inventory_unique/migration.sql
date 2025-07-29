/*
  Warnings:

  - A unique constraint covering the columns `[roomId,date]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_roomId_date_key" ON "Inventory"("roomId", "date");
