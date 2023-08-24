BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Post] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [title] NVARCHAR(1000) NOT NULL,
    [body] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Post_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000),
    [website] NVARCHAR(1000),
    [street] NVARCHAR(1000),
    [suite] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [zipcode] NVARCHAR(1000),
    [geo_lat] NVARCHAR(1000),
    [geo_lng] NVARCHAR(1000),
    [company_name] NVARCHAR(1000),
    [catchPhrase] NVARCHAR(1000),
    [bs] NVARCHAR(1000),
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
