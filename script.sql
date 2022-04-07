create database NewsDB

go

use NewsDB

create table NewsHeader
(
	id int primary key identity , 
	NewsTitle nvarchar(100) not null,
	NewsDesc nvarchar(100)not null,
	NewsDate Datetime not null , 
	NewsUser nvarchar(100) not null ,
	Approved bit default (0)
)

create table NewsContent
(
	contentId int primary key identity ,
	newsId int foreign key references NewsHeader,
	[Sequence] int not null check ([Sequence] in (1,2,3)),
	content text , 
	contentType varchar(30) ,
	contentUser varchar(50),
	contentDate DateTime,
)