function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function addRow(entry) {
  const tr = document.createElement('tr');

  const flightNo = document.createElement('td');
  const route = document.createElement('td');
  const gate = document.createElement('td');
  const date = document.createElement('td');
  const departureTime = document.createElement('td');
  const arrivalTime = document.createElement('td');
  const isDelayed = document.createElement('td');

  flightNo.classList.add('center-align');
  route.classList.add('center-align');
  gate.classList.add('center-align');
  departureTime.classList.add('center-align');
  arrivalTime.classList.add('center-align');
  isDelayed.classList.add('center-align');

  const arrivalDate = new Date(entry.arrivaltime);
  const departureDate = new Date(entry.departuretime);

  flightNo.innerText = entry.flightno;
  date.innerText = arrivalDate.toLocaleDateString();
  departureTime.innerText = arrivalDate.toLocaleTimeString();
  arrivalTime.innerText = departureDate.toLocaleTimeString();

  isDelayed.innerText = entry.isdelayed ? 'Delayed' : 'On Time';
  route.innerText = `${entry.fliesfrom} - ${entry.fliesto}`;
  gate.innerText = entry.gateno;

  if (entry.isdelayed) {
    isDelayed.style.color = 'red';
  } else {
    isDelayed.style.color = 'green';
  }

  tr.appendChild(flightNo);
  tr.appendChild(route);
  tr.appendChild(gate);
  tr.appendChild(date);
  tr.appendChild(departureTime);
  tr.appendChild(arrivalTime);
  tr.appendChild(isDelayed);

  return tr;
}

function fillFlightsTable(list) {
  const tbody = document.getElementById('tBody');
  const label = document.getElementById('noFlightsLabel');
  tbody.innerHTML = '';

  if (list === undefined || list.size === 0) {
    label.style.display = 'block';
    return;
  }
  label.style.display = 'none';


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
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      fillFlightsTable(data);
    })
    .catch((error) => {
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
