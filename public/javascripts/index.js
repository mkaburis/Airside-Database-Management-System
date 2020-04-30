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

  const arrivalDate = new Date(entry.arrivalTime);
  const departureDate = new Date(entry.departureTime);

  tr.id = entry.id;
  flightNo.innerText = entry.flightNumber;
  date.innerText = arrivalDate.toLocaleDateString();
  departureTime.innerText = departureDate.toLocaleTimeString();
  arrivalTime.innerText = arrivalDate.toLocaleTimeString();

  isDelayed.innerText = entry.isDelayed ? 'Delayed' : 'On Time';
  route.innerText = `${entry.departureCity} - ${entry.arrivalCity}`;
  gate.innerText = entry.gateNumber;

  if (entry.isDelayed) {
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

  const errorSpan = document.getElementById('errorSpan');
  errorSpan.style.display = 'none';


  const url = `../api/flights/simple?flightNo=${flightNo}&departureAirport=${depatureAirport}&arrivalAirport=${arrivalAirport}`;

  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then((data) => {
      fillFlightsTable(data);
    })
    .catch((error) => {
      errorSpan.innerText = error;
      errorSpan.style.display = 'block';
    });
}


function addEventListeners() {
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', searchForFlights);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
