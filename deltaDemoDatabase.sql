/* Use this for problem testing and start up of the website. 
*  Note: There is no inputs for playlists. 
*        Other than that, all Tables have inputs. 
*  I additionally wrote some 'SELECT ' statements to introduce how our website
*  would project libraries/all track names/etc...
*  If any other inputs to tables are added let everyone know so we can all add 
*  to our local databases so far.
*/ 
CREATE DATABASE DeltaMusic02;
USE DeltaMusic02;

CREATE TABLE Subscriptions(
	subsID INT PRIMARY KEY,
	name VARCHAR(255),
	price FLOAT
);
CREATE TABLE Users(
	userID INT NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255),
	firstName VARCHAR(225),
	lastName VARCHAR(225),
	subsID INT,
	FOREIGN KEY (subsID) REFERENCES Subscriptions(subsID)
);
CREATE TABLE Artists(
	artistID INT PRIMARY KEY,
	name VARCHAR(225)
);
CREATE TABLE Albums(
	albumID INT PRIMARY KEY,
	name VARCHAR(225),
	relYear INT
);
CREATE TABLE Genres(
	genreID INT PRIMARY KEY,
	name VARCHAR(255)
);
/* Should time be a string? I guess we will find its use when building website.*/
CREATE TABLE Tracks(
	trackID INT PRIMARY KEY,
	artistID INT NOT NULL,
	name VARCHAR(255) NOT NULL,
	albumID INT,
	genreID INT,
	time INT, 
	fileDir VARCHAR(255),
	FOREIGN KEY (artistID) REFERENCES Artists(artistID),
	FOREIGN KEY (albumID) REFERENCES Albums(albumID),
	FOREIGN KEY (genreID) REFERENCES Genres(genreID)
);
CREATE TABLE Libraries(
	libraryID INT NOT NULL PRIMARY KEY,
	userID INT NOT NULL,
	trackID INT NOT NULL,
	FOREIGN KEY (userID) REFERENCES Users(userID),
	FOREIGN KEY (trackID) REFERENCES Tracks(trackID)
);
CREATE TABLE Playlists(
	playlistID INT PRIMARY KEY,
	libraryID INT NOT NULL,
	name VARCHAR(255),
	FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)
);
CREATE TABLE Play_Tracks(
	playlistID INT NOT NULL,
	trackID INT NOT NULL,
	CONSTRAINT PT_PLAYTRACK PRIMARY KEY (playlistID, trackID),
	FOREIGN KEY (playlistID) REFERENCES Playlists(playlistID),
	FOREIGN KEY (trackID) REFERENCES Tracks(trackID)
);

/* Six Genres */
INSERT INTO Genres (genreID, name)
VALUES (01, 'Pop');
INSERT INTO Genres (genreID, name)
VALUES (02, 'Rock');
INSERT INTO Genres (genreID, name)
VALUES (03, 'Alternative');
INSERT INTO Genres (genreID, name)
VALUES (04, 'Hip Hop');
INSERT INTO Genres (genreID, name)
VALUES (05, 'Rap');
INSERT INTO Genres (genreID, name)
VALUES (06, 'R&B');
/* Two Types of Subscriptions */
INSERT INTO Subscriptions (subsID, name, price)
VALUES (100, 'Standard', 0.00);
INSERT INTO Subscriptions (subsID, name, price)
VALUES (200, 'Premium', 9.99);
/* Two Users so far (different subscription levels) */
INSERT INTO Users (userID, username, password, firstName, lastName, email, subsID)
VALUES (1, 'deltaStand', 'delta1234', 'L', 'M', 'e@mail', 100);
INSERT INTO Users (userID, username, password, firstName, lastName, email, subsID)
VALUES (2, 'deltaPrem', 'delta1234', 'D', 'S', 'e@mail', 200);
/* Three Artists Added */
INSERT INTO Artists (artistID, name)
VALUES (1, 'Meek Mill');
INSERT INTO Albums (albumID, name, relYear)
VALUES (1, 'Championships', 2018);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name, time)
VALUES (1, 1, 1, 04, 'file directory', 'Going Bad (feat. Drake)', 334);

INSERT INTO Artists (artistID, name)
VALUES (2, 'Kehlani');
INSERT INTO Albums (albumID, name, relYear)
VALUES (2, 'While We Wait', 2019);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name, time)
VALUES (2, 2, 2, 06, 'file directory', 'Nights Like This (feat. Ty Dolla Sign)', 000);

INSERT INTO Artists (artistID, name)
VALUES (3, 'Miguel');
INSERT INTO Albums (albumID, name, relYear)
VALUES (3, 'War & Leisure', 2017);
INSERT INTO Tracks (trackID, artistID, albumID, genreID, fileDir, name, time)
VALUES (3, 3, 3, 06, 'file directory', 'Come Through and Chill (feat. J.Cole & Salaam Remi)', 000);

/* Project tables so far */ 
SELECT * FROM Users;
SELECT * FROM Subscriptions;
SELECT * FROM Genres;
SELECT * FROM Artists;
SELECT * FROM Albums;
/* List all track names */
SELECT name FROM Tracks;
/* Insert (download) these two tracks into userID[1] library */
INSERT INTO Libraries (libraryID, trackID, userID)
VALUES (1, 2, 1);
INSERT INTO Libraries (libraryID, trackID, userID)
VALUES (2, 3, 1);
/* All tracks belonging to all users libraries */
SELECT * FROM Libraries;
/* List all track names that are on userID[1] personal library */ 
SELECT name FROM Libraries 
	INNER JOIN Tracks ON Libraries.trackID=Tracks.trackID;



