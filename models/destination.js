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

module.exports = { getDestinations };
