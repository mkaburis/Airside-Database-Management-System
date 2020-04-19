function addRow(entry) {
  const tr = document.createElement('tr');

  const flightNo = document.createElement('td');
  const departureLoc = document.createElement('td');
  const arrivalLoc = document.createElement('td');
  const departureTime = document.createElement('td');
  const arrivalTime = document.createElement('td');
  const isDelayed = document.createElement('td');

  flightNo.classList.add('center-align');
  departureLoc.classList.add('center-align');
  arrivalLoc.classList.add('center-align');
  departureTime.classList.add('center-align');
  arrivalTime.classList.add('center-align');
  isDelayed.classList.add('center-align');

  flightNo.innerText = entry.flightno;
  departureLoc.innerText = entry.fliesfrom;
  arrivalLoc.innerText = entry.fliesto;

  tr.appendChild(flightNo);
  tr.appendChild(departureLoc);
  tr.appendChild(arrivalLoc);
  tr.appendChild(departureTime);
  tr.appendChild(arrivalTime);
  tr.appendChild(isDelayed);

  return tr;
}

function fillFlightsTable(list) {
  const tbody = document.getElementById('tBody');
  tbody.innerHTML = '';

  list.forEach((element) => {

    const tr = addRow(element);
    tbody.appendChild(tr);
  });
}

function searchForFlights() {
  const flightNo = document.getElementById('flightNo').value;
  const depatureAirport = document.getElementById('depatureAirport').value;
  const arrivalAirport = document.getElementById('arrivalAirport').value;


  const url = `../flights?flightNo=${flightNo}&departureAirport=${depatureAirport}&arrivalAirport=${arrivalAirport}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fillFlightsTable(data);
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
