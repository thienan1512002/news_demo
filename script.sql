create database NewsDB

go

use NewsDB

create table NewsHeader
(
	id int primary key identity , 
	NewsTitle nvarchar(1000) not null,
	NewsDesc nvarchar(1000)not null,
	NewsDate Datetime not null , 
	NewsUser nvarchar(100) not null ,
	Approved bit default (0)
)

create table NewsContent
(
	contentId int primary key identity ,
	newsId int foreign key references NewsHeader,
	[Sequence] int not null ,
	content nvarchar(1000) not null , 
	contentType varchar(30) not null ,
	contentUser varchar(50) not null,
	contentDate DateTime not null,
)