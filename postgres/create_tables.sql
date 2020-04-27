/*
*  FileName: create_tables.sql
*  COP 4710 - Database Design (Spring 2020)
*  Mihail Kaburis, Jose-Pablo Mantilla, Jody Rutter
*  NOTE: Run these commands using psql since this is database creation!
*  On WindowsOS ensure PATH variable is set up for postgreSQL
*  Command to run sql script \i create_tables.sql
*/ -- Establish user account

CREATE USER airport_admin WITH PASSWORD 'tampa_airport' SUPERUSER CREATEDB CREATEROLE INHERIT;

-- Create the database

CREATE DATABASE airsidedb WITH OWNER = airport_admin ENCODING = 'UTF8' TABLESPACE = pg_default CONNECTION
LIMIT = -1;

-- CONNECT to database
\c airsidedb -- Ensure database is configured for 'UTF8' file format
SET client_encoding TO 'utf8';

-- Setup the tables

CREATE TABLE Users(UserID SERIAL PRIMARY KEY,
                                         UserName VARCHAR(20),
                                                  Password VARCHAR(60),
                                                           Permission INTEGER);


CREATE TABLE Airlines(AirlineCode VARCHAR(2) PRIMARY KEY,
                                                     AirlineName TEXT);


CREATE TABLE Planes(AircraftID VARCHAR(3) PRIMARY KEY,
                                                  PlaneName TEXT, SeatingCapacity INTEGER);


CREATE TABLE Concourses(GateNo VARCHAR(3) PRIMARY KEY,
                                                  Airside VARCHAR(1));


CREATE TABLE Destinations(AirportCode VARCHAR(3) PRIMARY KEY,
                                                         AirportName TEXT, City TEXT, AdministrativeDivision TEXT, Country TEXT);


CREATE TABLE Routes(RouteID SERIAL PRIMARY KEY,
                                           AirlineCode VARCHAR(2) REFERENCES Airlines NOT NULL,
                                                                                      FlightNo VARCHAR(10),
                                                                                               IsActive BOOLEAN, FliesTo VARCHAR(3) REFERENCES Destinations NOT NULL,
                                                                                                                                                            FliesFrom VARCHAR(3) REFERENCES Destinations NOT NULL);


CREATE TABLE Passengers(PassengerID SERIAL PRIMARY KEY,
                                                   FirstName VARCHAR(50),
                                                             LastName VARCHAR(50),
                                                                      DOB DATE, Nationality VARCHAR(50),
                                                                                            DLNo VARCHAR(50) UNIQUE,
                                                                                                             PassportNo VARCHAR(50) UNIQUE,
                                                                                                                                    TSAPre BOOLEAN, HomeAirport VARCHAR(3) REFERENCES Destinations NOT NULL);


CREATE TABLE FlightLogs(FlightID SERIAL PRIMARY KEY,
                                                DepartureTime TIMESTAMP(0),
                                                              ArrivalTime TIMESTAMP(0) NULL,
                                                                                       GateNo VARCHAR(3) REFERENCES Concourses NOT NULL,
                                                                                                                               IsDelayed BOOLEAN, AircraftID VARCHAR(3) REFERENCES Planes NOT NULL,
                                                                                                                                                                                          RouteID SERIAL REFERENCES Routes NOT NULL);


CREATE TABLE PassengerFlights(FlightID SERIAL REFERENCES FlightLogs(FlightID) NOT NULL,
                                                                              PassengerID SERIAL REFERENCES Passengers(PassengerID) NOT NULL,
                                                                                                                                    CheckedIn BOOLEAN, Connecting BOOLEAN);

-- Create admin for access purposes
-- username: admin
-- password: password
INSERT INTO public.users(userid, username, password, permission)
VALUES (1,
        'admin',
        '$2b$10$uVvmWVuBBAhfWX8jsF.mV.af/Q1HDtvFXSlbFiHwZaP0tAM1d/5BC',
        2);

-- Copy .csv files
\copy Planes(AircraftID, PlaneName, SeatingCapacity)
FROM 'planes.csv' WITH
DELIMITER ',' CSV HEADER;

\copy Airlines(AirlineCode, AirlineName)
FROM 'airlines.csv' WITH
DELIMITER ',' CSV HEADER;

\copy Concourses(GateNo, Airside)
FROM 'concourses.csv' WITH
DELIMITER ',' CSV HEADER;

\copy Destinations(AirportCode, AirportName, City, AdministrativeDivision, Country)
FROM 'destinations.csv' WITH
DELIMITER ',' CSV HEADER;

\copy Routes(RouteID, AirlineCode, FlightNo, IsActive, FliesTo, FliesFrom)
FROM 'routes.csv' WITH
DELIMITER ',' CSV HEADER;

\copy Passengers(PassengerID, FirstName, LastName, DOB, Nationality, DLNo, PassportNo, TSAPre, HomeAirport)
FROM 'passengers.csv' WITH
DELIMITER ',' NULL AS 'NULL' CSV HEADER;

\copy FlightLogs(FlightID, DepartureTime, ArrivalTime, GateNo, IsDelayed, AircraftID, RouteID)
FROM 'flightlogs.csv' WITH
DELIMITER ',' CSV HEADER;

\copy PassengerFlights(FlightID, PassengerID, CheckedIn, Connecting)
FROM 'passengerflights.csv' WITH
DELIMITER ',' CSV HEADER;

