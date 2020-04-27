function addRow(entry, count) {
  const tr = document.createElement('tr');

  const airportcode = document.createElement('td');
  const airportname = document.createElement('td');
  const city = document.createElement('td');
  const administrativedivision = document.createElement('td');
  const country = document.createElement('td');
  const editBtn = document.createElement('td');
  const deleteBtn = document.createElement('td');

  airportcode.classList.add('center-align');
  airportname.classList.add('center-align');
  city.classList.add('center-align');
  administrativedivision.classlist.add('center-align');
  country.classlist.add('center-align');
  editBtn.classList.add('center-align');
  deleteBtn.classList.add('center-align');

  tr.id = entry.id;
  airportcode.innerText = entry.airportcode;
  airportname.innerText = entry.airportname;
  city.innerText = entry.city;
  administrativedivision.innerText = entry.administrativedivision;
  country.innerText = entry.country;
  editBtn.innerHTML = '<button class="btn" type="button" id="searchButton"> <i class="material-icons right">edit</i ></button >';
  deleteBtn.innerHTML = '<button class="btn" type="button" id="searchButton"> <i class="material-icons right">delete</i ></button >';

  tr.appendChild(airportcode);
  tr.appendChild(airportname);
  tr.appendChild(city);
  tr.appendChild(administrativedivision);
  tr.appendChild(country);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  return tr;
}

function populateTable(list) {
  const tbody = document.getElementById('tBody');
  const label = document.getElementById('noDestinationsFound');
  tbody.innerHTML = '';

  if (list === undefined || list.size === 0) {
    label.style.display = 'block';
    return;
  }
  label.style.display = 'none';


  list.forEach((element, index) => {
    const tr = addRow(element, index);
    tbody.appendChild(tr);
  });
}

function searchForDestinations() {
  const airportCode = document.getElementById('flightNo').value;
  const city = document.getElementById('depatureAirport').value;
  const adminDivision = document.getElementById('arrivalAirport').value;
  const country = document.getElementById('arrivalAirport').value;


  const url = `../api/admin/getDestinations?permission=${selectedValue}`;
  fetch(url, { method: 'GET' })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      alert('Error adding user');
      throw response.statusText;
    })
    .then((response) => populateTable(response))
    .catch((err) => console.log(err));
}

function addDestination() {
  const username = document.getElementById('username');
  const authRadioGroup = document.getElementById('authRadioGroup');
  const selectedAuth = authRadioGroup.querySelector('input[name="authRadio"]:checked').value;
  const usernameVal = username.value;

  if (!username.validity.valid) {
    return;
  }

  const url = `../api/admin/getDestinations?airportCode=${usernameVal}&permission=${selectedAuth}`;
  fetch(url, { method: 'POST' })
    .then((response) => {
      if (response.status === 200) {
        username.value = '';
        return;
      }
      alert('Error adding user');
      throw response.statusText;
    })
    .catch((err) => console.log(err));
}

function addEventListeners() {
  const saveButton = document.getElementById('saveButton');
  const searchButton = document.getElementById('searchButton');

  saveButton.addEventListener('click', addDestination);
  searchButton.addEventListener('click', searchForDestinations);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  searchForDestinations();
}, false);
