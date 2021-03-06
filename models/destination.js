const db = require('../db/postgres');

// Destinations Class
class Destinations {
    airportCode;
    airportName;
    city;
    administrativeDivision;
    country;

    constructor(airportCode, airportName, city, administrativeDivision, country) {
        this.airportCode = airportCode;
        this.airportName = airportName;
        this.city = city;
        this.administrativeDivision = administrativeDivision;
        this.country = country;
    }
}

async function addDestination(inputAirportCode, inputAirportName, inputCity,
    inputAdminDiv, inputCountry) {
        const query = 'INSERT INTO destinations (airportcode, airportname, city, '
        + 'administrativedivision, country) VALUES ($1, $2, $3, $4, $5) RETURNING *;'

        const result = await db.query(query, [inputAirportCode, inputAirportName, inputCity,
        inputAdminDiv, inputCountry])
        .then((res) => {
            return res.rows;
        })
        .then((res) => res.map((entry) => {

            const destination = new Destinations(entry.airportcode, entry.airportname, entry.city, 
                entry.administrativedivision, entry.country);
        }));

        if (result.length < 1) {
            return false;
        }

        return true;
    }

async function getDestinations(inputAirportCode, inputCity,
    inputAdminDiv, inputCountry) {
        const query = 'SELECT * FROM Destinations WHERE airportcode LIKE $1 AND city like $2 '
        + 'AND administrativeDivision LIKE $3 AND country LIKE $4 ORDER BY airportcode';

        let destinationObject = {destinations: [], count: 0};
        let count = 0;

        const result = await db.query(query, [inputAirportCode, inputCity, inputAdminDiv,
            inputCountry])
            .then((res) => {
                return res.rows;
            })
            .then((res) => res.map((entry) => {
                const destination = new Destinations(entry.airportcode, entry.airportname, entry.city, 
                    entry.administrativedivision, entry.country);

                    destinationObject.destinations.push(destination);
                    count++;
                    
            }));

            destinationObject.count = count;
            console.log(destinationObject);
            return destinationObject;
    }

async function deleteDestination(inputAirportCode) {
    

    const query1 = 'DELETE FROM passengerflights WHERE flightID IN '
    + '(SELECT flightid FROM flightlogs WHERE routeID IN (SELECT routeId '
    + 'FROM routes WHERE fliesto = $1 OR fliesfrom = $1));';

    const query2 = 'DELETE FROM flightlogs WHERE routeID IN '
    + '(SELECT routeID FROM routes WHERE fliesto = $1 OR fliesfrom = $1);';

    const query3 = 'DELETE FROM routes WHERE fliesTo IN '
    + '(SELECT airportcode FROM destinations WHERE airportcode = $1) OR '
    + 'fliesFrom IN (SELECT airportcode FROM destinations WHERE airportcode = $1);';

    const query4 = 'DELETE FROM destinations WHERE airportcode = $1 RETURNING *;';


    const result1 = await db.query(query1, [inputAirportCode]);
    const result2 = await db.query(query2, [inputAirportCode]);
    const result3 = await db.query(query3, [inputAirportCode]);
    const result4 = await db.query(query4, [inputAirportCode])
    .then((res) => {
        return res.rows;})
        .then((res) => res.map((entry) => {
            const destination = new Destinations(entry.airportcode, entry.airportname, entry.city,
            entry.administrativedivision, entry.country);
    }));


    if (result4.length < 1) {
        return false;
    }

    return true;
}

async function updateDestination(inputAirportCode, inputAirportName, inputCity, inputAdminDiv, inputCountry) {

    let query = 'UPDATE destinations SET ';

    console.log(`${inputAirportName} ${inputCity} ${inputAdminDiv} ${inputCountry}`)

    if (inputAirportName !== '' && inputCity !== '' && inputAdminDiv !== '' && inputCountry !== '') {
        console.log('yay!')
        query = query.concat(`airportName = '${inputAirportName}', city = '${inputCity}', `
        + `administrativeDivision = '${inputAdminDiv}', country = '${inputCountry}' `);
    }

    else if (inputAirportName !== '' && inputCity !== '' && inputAdminDiv !== '') {
        query = query.concat(`airportName = '${inputAirportName}', city = '${inputCity}', `
        + `administrativeDivision = '${inputAdminDiv}' `);
    }

    else if (inputAirportName !== '' && inputCity !== '' && inputCountry !== '') {
        query = query.concat(`airportName = '${inputAirportName}',  city = '${inputCity}', ` 
        + `country = '${inputCountry}' `);
    }

    else if (inputCity !== '' && inputAdminDiv !== '' && inputCountry !== '') {
        query = query.concat(`city = '${inputCity}', administrativeDivision = '${inputAdminDiv}', `
        + `country = '${inputCountry}' `);
    }

    else if (inputAirportName !== '' && inputCity !== '') {
        query = query.concat(`airportName = '${inputAirportName}', city = '${inputCity}' `);
    }

    else if (inputAirportName !== '' && inputAdminDiv !== '') {
        query = query.concat(`airportName = '${inputAirportName}', administrativeDivision = '${inputAdminDiv}' `);
    }

    else if (inputAirportName !== '' && inputCountry !== '') {
        query = query.concat(`airportName = '${inputAirportName}', country = '${inputCountry}' `);
    }

    else if (inputCity !== '' && inputAdminDiv !== '') {
        query = query.concat(`city = '${inputCity}', administrativeDivision = '${inputAdminDiv}' `);
    }

    else if (inputCity !== '' && inputCountry !== '') {
        query = query.concat(`city = '${inputCity}',  country = '${inputCountry}' `);
    }

    else if (inputAdminDiv !== '' && inputCountry !== '') {
        query = query.concat(`administrativeDivision = '${inputAdminDiv}', country = '${inputCountry}' `);
    }

    else if (inputAirportName !== '') {
        query = query.concat(`airportName = '${inputAirportName}' `);
    }

    else if (inputCity !== '') {
        query = query.concat(`city = '${inputCity}' `);
    }

    else if (inputAdminDiv !== '') {
        query = query.concat(`administrativeDivision = '${inputAdminDiv}' `);
    }

    else if (inputCountry !== '') {
        query = query.concat(`country = '${inputCountry}' `);
    }

    else {
        return false;
    }

    query = query.concat(`WHERE airportcode = '${inputAirportCode}' RETURNING *;`);

    console.log(query);

    const result = await db.query(query)
        .then((res) => {
            return res.rows;
        })
        .then((res) => res.map((entry) => {
            const destination = new Destinations(entry.airportcode, entry.airportname, entry.city,
                entry.administrativedivision, entry.country);
        }));

    if (result.length < 1) {
        return false;
    }

    return true;
}

module.exports = { addDestination, getDestinations, deleteDestination, updateDestination };
