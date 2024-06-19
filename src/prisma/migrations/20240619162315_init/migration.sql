BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Guest] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [birthdate] DATETIME2 NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [addressId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Guest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Guest_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Guest_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [Guest_addressId_key] UNIQUE NONCLUSTERED ([addressId])
);

-- CreateTable
CREATE TABLE [dbo].[Address] (
    [id] INT NOT NULL IDENTITY(1,1),
    [street] NVARCHAR(1000) NOT NULL,
    [number] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [state] NVARCHAR(1000) NOT NULL,
    [country] NVARCHAR(1000) NOT NULL,
    [zipCode] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Address_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Address_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reservation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [hotelName] NVARCHAR(1000) NOT NULL,
    [roomNumber] NVARCHAR(1000) NOT NULL,
    [value] DECIMAL(32,16) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [startDate] DATETIME2 NOT NULL,
    [endDate] DATETIME2 NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [guestId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reservation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Reservation_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Reservation_guestId_key] UNIQUE NONCLUSTERED ([guestId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Guest] ADD CONSTRAINT [Guest_addressId_fkey] FOREIGN KEY ([addressId]) REFERENCES [dbo].[Address]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Reservation] ADD CONSTRAINT [Reservation_guestId_fkey] FOREIGN KEY ([guestId]) REFERENCES [dbo].[Guest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
