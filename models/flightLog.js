const db = require('../db/postgres');

class Flights {
  id;
  flightNumber;
  arrivalTime;
  departureTime;
  arrivalCity;
  departureCity;
  gateNumber;
  isDelayed;

  constructor(id, flightNo, arrivalTime, departureTime, arrivalCity, departureCity, gateNumber, isDelayed) {
    this.id = id;
    this.flightNumber = flightNo;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.arrivalCity = arrivalCity;
    this.departureCity = departureCity;
    this.gateNumber = gateNumber;
    this.isDelayed = isDelayed
  }

}

class PassengerFlight {
  id;
  flightNumber;
  arrivalTime;
  departureTime;
  arrivalCity;
  departureCity;
  gateNumber;
  isDelayed;
  checkedIn;
  connecting;

  constructor(id, flightNo, arrivalTime, departureTime, arrivalCity, departureCity, gateNumber, isDelayed, checkedIn, connecting) {
    this.id = id;
    this.flightNumber = flightNo;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.arrivalCity = arrivalCity;
    this.departureCity = departureCity;
    this.gateNumber = gateNumber;
    this.isDelayed = isDelayed
    this.checkedIn = checkedIn;
    this.connecting = connecting;
  }
}

function extractFlightNo(flightNo) {
  const reAirline = /\d*[a-zA-Z]+\d*/;
  const reFlight = /\d{2,}/;
  const airline = reAirline.exec(flightNo);
  const flightNum = reFlight.exec(flightNo);

  return {
    airline: airline != null ? airline[0] : null,
    flightNum: flightNum != null ? flightNum[0] : null
  };
}

async function getFlights(airline, flightNum, arrivalAirport, departureAirport, isactive) {
  const query = 'SELECT * FROM routes AS t1 LEFT JOIN flightlogs AS t2 ON t1.routeid '
    + '= t2.routeid  WHERE flightno like $1 AND fliesto like $2 AND fliesfrom like $3 AND airlinecode like $4 and isactive=$5 '
    + 'ORDER BY departuretime, arrivaltime';
  const result = await db.query(query, [
    flightNum, arrivalAirport, departureAirport, airline, isactive
    // flightNo, arrivalAirport, departureAirport, airline, yesterday, tommorow
  ])
    .then((res) => {
      return res.rows
    })
    .then((res) => res.map((entry) => {
      const flightCode = `${entry.airlinecode} ${entry.flightno}`
      const flight = new Flights(entry.flightid, flightCode, entry.arrivaltime, entry.departuretime,
        entry.fliesto, entry.fliesfrom, entry.gateno, entry.isdelayed);
      return flight;
    }));

  return result;
}

async function getFlights(params, values) {
  let query = 'SELECT * FROM routes AS t1 LEFT JOIN flightlogs AS t2 ON t1.routeid = t2.routeid '

  if (params.length > 0) {
    query += 'WHERE ';

    for (let index = 0; index < params.length - 1; index++) {
      const element = params[index];
      query += `${element.field} ${element.op} $${index + 1} AND `
    }

    const lastElem = params[params.length - 1];
    query += `${lastElem.field} ${lastElem.op} $${params.length} `
  }
  query += 'ORDER BY departuretime, arrivaltime';

  const result = await db.query(query, values)
    .then((res) => {
      return res.rows
    })
    .then((res) => res.map((entry) => {
      const flightCode = `${entry.airlinecode} ${entry.flightno}`
      const flight = new Flights(entry.flightid, flightCode, entry.arrivaltime, entry.departuretime,
        entry.fliesto, entry.fliesfrom, entry.gateno, entry.isdelayed);
      return flight;
    }));

  return result;
}

async function getPassengerFlightList(passengerId) {
  const query = 'SELECT * FROM passengerflights'
    + ' INNER JOIN flightlogs ON passengerflights.flightId = flightlogs.flightId'
    + ' INNER JOIN routes ON routes.routeid = flightlogs.routeid'
    + ' WHERE passengerflights.passengerid = $1'

  const result = await db.query(query, [passengerId])
    .then((response) => response.rows)
    .then((respone) => respone.map((entry) => {
      const flightCode = `${entry.airlinecode} ${entry.flightno}`
      const flight = new PassengerFlight(entry.flightid, flightCode, entry.arrivaltime, entry.departuretime,
        entry.fliesto, entry.fliesfrom, entry.gateno, entry.isdelayed, entry.checkedin, entry.connecting);
      return flight;
    }));

  return result;
}

async function getPassengerFlight(passengerId, flightId) {
  const query = 'SELECT * FROM passengers'
    + ' INNER JOIN passengerflights ON passengers.passengerid = passengerflights.passengerid'
    + ' INNER JOIN flightlogs ON passengerflights.flightId = flightlogs.flightId'
    + ' INNER JOIN routes ON routes.routeid = flightlogs.routeid'
    + ' WHERE passengers.passengerid = $1 AND flightlogs.flightId = $2';

  const result = await db.query(query, [passengerId, flightId])
    .then((response) => response.rows[0])
    .then((entry) => {
      const flightCode = `${entry.airlinecode} ${entry.flightno}`
      const flight = new PassengerFlight(entry.flightid, flightCode, entry.arrivaltime, entry.departuretime,
        entry.fliesto, entry.fliesfrom, entry.gateno, entry.isdelayed, entry.checkedin, entry.connecting);
      return flight;
    });

  return result;
}

module.exports = { extractFlightNo, getFlights, getPassengerFlightList, getPassengerFlight }