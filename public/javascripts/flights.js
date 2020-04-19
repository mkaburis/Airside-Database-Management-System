function searchForFlights() {
  const flightNo = document.getElementById('flightNo').innerText;
  const depatureAirport = document.getElementById('depatureAirport').innerText;
  const arrivalAirport = document.getElementById('arrivalAirport').innerText;


  const url = `../flights?flightNo=${flightNo}&departureAirport=${depatureAirport}&arrivalAirport=${arrivalAirport}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

function addEventListeners() {
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', searchForFlights);
}


document.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
