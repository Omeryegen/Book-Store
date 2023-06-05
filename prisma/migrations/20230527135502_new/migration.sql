-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "Book";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "User";

-- CreateTable
CREATE TABLE "User"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book"."Book" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "seller" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "images" TEXT[],
    "price" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"."User"("email");
