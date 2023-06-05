/*
  Warnings:

  - The `condition` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `Book` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Book"."Book" DROP COLUMN "condition",
ADD COLUMN     "condition" INTEGER,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER;
