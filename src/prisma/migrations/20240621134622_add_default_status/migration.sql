BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_status_df] DEFAULT 'CONFIRMED' FOR [status];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
