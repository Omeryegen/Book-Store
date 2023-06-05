/*
  Warnings:

  - Made the column `condition` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book"."Book" ALTER COLUMN "condition" SET NOT NULL,
ALTER COLUMN "condition" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;
