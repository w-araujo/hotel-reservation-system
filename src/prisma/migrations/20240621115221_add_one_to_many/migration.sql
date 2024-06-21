/*
  Warnings:

  - Made the column `guestId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Reservation] DROP CONSTRAINT [Reservation_guestId_fkey];

-- DropIndex
ALTER TABLE [dbo].[Reservation] DROP CONSTRAINT [Reservation_guestId_key];

-- AlterTable
ALTER TABLE [dbo].[Reservation] ALTER COLUMN [guestId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_guestId_fkey] FOREIGN KEY ([guestId]) REFERENCES [dbo].[Guest]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
