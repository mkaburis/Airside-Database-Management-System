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

async function getFlights(airline, flightNum, arrivalAirport, departureAirport) {
  const query = 'SELECT * FROM routes AS t1 LEFT JOIN flightlogs AS t2 ON t1.routeid '
    + '= t2.routeid  WHERE flightno like $1 AND fliesto like $2 AND fliesfrom like $3 AND airlinecode like $4 and isactive=true '
    + 'ORDER BY departuretime, arrivaltime';
  const result = await db.query(query, [
    flightNum, arrivalAirport, departureAirport, airline
    // flightNo, arrivalAirport, departureAirport, airline, yesterday, tommorow
  ])
    .then((res) => {
      return res.rows
    })
    .then((res) => res.map((entry) => {
      const flightCode = `${entry.airlinecode} ${entry.flightno}`
      const flight = new Flights(entry.flightid, flightCode, entry.arrivaltime, entry.departuretime, entry.fliesto, entry.fliesfrom, entry.gateno, entry.isdelayed);
      return flight;
    }));

  return result;
}

module.exports = { extractFlightNo, getFlights }