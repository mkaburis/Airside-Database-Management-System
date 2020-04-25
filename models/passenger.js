class Passenger {
  id;
  firstName;
  lastName;
  dob;
  nationality;
  license;
  passport;
  tsaPrecheck;
  homeAirport;

  constructor(id, firstName, lastName, dob, nationality, license, passport, tsaPrecheck, homeAirport) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.nationality = nationality;
    this.license = license;
    this.passport = passport;
    this.tsaPrecheck = tsaPrecheck;
    this.homeAirport = homeAirport;
  }
}

async function getPassengerById(id) {
  const result = await db.query(
    'SELECT * FROM passenger WHERE passengerid=$1',
    [id]
  )
    .then((res) => res.rows[0])
    .catch((err) => console.error(err.stack));

  if (result === undefined) {
    return null;
  }

  const passenger = Passenger(result.passengerid, result.firstname, result.lastname, result.dob,
    result.nationality, result.dlno, result.passportno, result.tsapre, result.homeairport);

  return passenger;
}

async function addPassenger(passenger) {
  if (typeof (passenger) != Passenger) {
    throw 'passenger must be type Passenger';
  }

  const result = await db.query(
    'INSERT INTO passengers(firstname, lastname, dob, '
    + 'nationality, dlno, passportno, tsapre, homeairport) VALUES($1, $2, $3, $4, $5, $6, $7, $8);',
    [passenger.firstName, passenger.lastName, passenger.dob, passenger.nationality,
    passenger.license, passenger.passport, passenger.tsaPrecheck, passenger.homeAirport]
  )
    .catch((err) => console.error(err.stack));

  if (result === undefined) {
    return false;
  }

  return true;
}

async function editPassenger(id, field, value) {
  const result = await db.query(
    `UPDATE passengers SET ${field}=$1; WHERE passengerid=$2;`,
    [value, id]
  )
    .catch((err) => console.error(err.stack));

  if (result === undefined) {
    return false;
  }

  return true;
}



module.exports = { getPassengerById, addPassenger, editPassenger, Passenger }