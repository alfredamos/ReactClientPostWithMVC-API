SET IDENTITY_INSERT [dbo].[Authors] ON
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (1, N'Alfred', N'Amos', N'alfredamos@gmail.com', N'07034103471', NULL, N'1961-04-09 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (2, N'Peter', N'Amos', N'peteramos250@gmail.com', N'2897009172', NULL, N'2000-12-28 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (3, N'Paul', N'Amos', N'paulgdgc@gmail.com', N'2897006943', NULL, N'1999-01-17 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (4, N'Adenike', N'Amos', N'adenikeamos@yahoo.com', N'08055006709', NULL, N'1963-10-19 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (5, N'John', N'Amos', N'johnamos@yahoo.com', N'6479758004', NULL, N'1995-08-06 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (6, N'Paolo', N'Malgari', N'paolo.malgari@eni.com', N'34989075634', NULL, N'1964-03-07 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (7, N'Jaime', N'Fox', N'jaimefox@aol.com', N'2897002937', NULL, N'1965-09-24 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (8, N'Susan', N'Collins', N'susan.collings@aol.com', N'9768999098', NULL, N'1970-11-07 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (9, N'James', N'Komolafe', N'komolafejames@aol.com', N'0809756498710', NULL, N'1956-02-22 00:00:00')
INSERT INTO [dbo].[Authors] ([AuthorID], [FirstName], [LastName], [Email], [PhoneNumber], [PhotoPath], [DateOfBirth]) VALUES (10, N'Chris', N'Alli', N'alliforshow@christen.com', N'09045952367', NULL, N'1986-06-13 00:00:00')
SET IDENTITY_INSERT [dbo].[Authors] OFF
select convert(varchar(10), cast(ts as date), 101) from <Authors>