CREATE PROCEDURE dbo.sp_create_category
    @description VARCHAR(100),
	@enabled bit
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO categories (description, enabled)
    VALUES (@description, @enabled);
END