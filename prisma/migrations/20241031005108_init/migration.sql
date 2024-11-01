-- CreateTable
CREATE TABLE "Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "limitDate" DATETIME NOT NULL,
    "order" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_name_key" ON "Tasks"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_order_key" ON "Tasks"("order");
