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

  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const selected = document.getElementById('optionSelect').value;

  const url = `../api/flights/advanced?flightNo=${flightNo}&departureAirport=${depatureAirport}
  &arrivalAirport=${arrivalAirport}&option=${selected}&before=${startDate}&after=${endDate}`;

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
  const logOutButton = document.getElementById('logOutButton');
  const searchButton = document.getElementById('searchButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);
  searchButton.addEventListener('click', searchForFlights);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  datepickerElems = document.querySelectorAll('.datepicker');
  M.Datepicker.init(datepickerElems);
  const selectElems = document.querySelectorAll('select');
  M.FormSelect.init(selectElems);
}, false);
