/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unique_id` on the `roles` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `full_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'b2c', 'b2b', 'guest');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "unique_id",
ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_active" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "permissions" VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "user_type" "UserRole" DEFAULT 'guest',
ADD COLUMN     "username" VARCHAR(255) NOT NULL,
ALTER COLUMN "role_id" DROP NOT NULL,
ALTER COLUMN "role_id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
