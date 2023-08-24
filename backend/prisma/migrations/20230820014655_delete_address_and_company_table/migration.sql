/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Address] DROP CONSTRAINT [Address_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Company] DROP CONSTRAINT [Company_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [bs] NVARCHAR(1000),
[catchPhrase] NVARCHAR(1000),
[city] NVARCHAR(1000),
[company_name] NVARCHAR(1000),
[geo_lat] NVARCHAR(1000),
[geo_lng] NVARCHAR(1000),
[street] NVARCHAR(1000),
[suite] NVARCHAR(1000),
[zipcode] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[Address];

-- DropTable
DROP TABLE [dbo].[Company];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
