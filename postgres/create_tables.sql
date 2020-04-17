/* 
*  FileName: create_tables.sql 
*  COP 4710 - Database Design (Spring 2020)
*  Mihail Kaburis, Jose-Pablo Mantilla, Jody Rutter
*  NOTE: Run these commands using psql since this is database creation!
*/

-- Establish user account
CREATE USER airport_admin WITH PASSWORD 'tampa_airport' SUPERUSER CREATEDB CREATEROLE INHERIT;

-- Create the database
CREATE DATABASE airsidedb WITH 
    OWNER = airport_admin
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- CONNECT to database
\c airsidedb

-- Setup the tables
CREATE TABLE Users(UserID SERIAL PRIMARY KEY, UserName VARCHAR(20), Password VARCHAR(60),
Permission INTEGER);

CREATE TABLE Planes(PlaneModel VARCHAR(10) PRIMARY KEY, Manufacturer TEXT, SeatingCapacity INTEGER);

CREATE TABLE Concourses(GateNo VARCHAR(3) PRIMARY KEY, Airside VARCHAR(1));

CREATE TABLE Destinations(AirportCode VARCHAR(3) PRIMARY KEY, AirportName TEXT, City TEXT, 
AdministrativeDivision TEXT, Country TEXT);

CREATE TABLE Routes(RouteID SERIAL PRIMARY KEY, FlightNo VARCHAR(4), IsActive BOOLEAN, AirportCode VARCHAR(3) 
REFERENCES Destinations NOT NULL);

CREATE TABLE Passengers(PassengerID SERIAL PRIMARY KEY, FirstName VARCHAR(50), LastName VARCHAR(50),
DOB DATE, DLNo VARCHAR(50) NULL UNIQUE, PassportNo VARCHAR(50) NULL UNIQUE, Nationality VARCHAR(50),
TSAPre BOOLEAN, AirportCode VARCHAR(3) REFERENCES Destinations NOT NULL);

CREATE TABLE FlightLogs(FlightID SERIAL PRIMARY KEY, DepartureTime TIMESTAMP(0), 
ArrivalTime TIMESTAMP(0) NULL, Airline VARCHAR(20), GateNo VARCHAR(3) REFERENCES Concourses NOT NULL, 
IsDelayed BOOLEAN, PlaneModel VARCHAR(10) REFERENCES Planes NOT NULL, RouteId SERIAL REFERENCES Routes NOT NULL);

CREATE TABLE PassengerFlights(FlightID SERIAL REFERENCES FlightLogs(FlightID) NOT NULL, PassengerID SERIAL
REFERENCES Passengers(PassengerID) NOT NULL, CheckedIn BOOLEAN, Connecting BOOLEAN);

-- Copy .csv files
\copy Concourses(GateNo, Airside) FROM 'concourses.csv' WITH DELIMITER ',' CSV HEADER;