create database NewsDB

go

use NewsDB

create table NewsHeader
(
	id int primary key identity , 
	NewsTitle nvarchar(max) not null,
	NewsDesc nvarchar(max)not null,
	NewsDate Datetime not null , 
	NewsUser nvarchar(100) not null ,
	Approved bit default (0)
)

create table NewsContent
(
	contentId int primary key identity ,
	newsId int foreign key references NewsHeader,
	[Sequence] int not null ,
	content nvarchar(max) not null , 
	contentType varchar(3) not null ,
	contentUser varchar(max) not null,
	contentDate DateTime not null,
)