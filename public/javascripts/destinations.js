let rowVal;

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getAirportInfo(htmlRow, i) {
  const htmlValue = htmlRow.getElementsByTagName('td')[i];
  const airportCode = htmlValue.innerText;
  return airportCode;
}

function updateDestination(htmlRow) {
  console.log('attempting to update destination');
  const editAirportCode = document.getElementById('editAirportCode');
  const editAirportName = document.getElementById('editAirportName');
  const editCity = document.getElementById('editCity');
  const editAdminDiv = document.getElementById('editAdministrativeDivision');
  const editCountry = document.getElementById('editCountry');

  // PK absolultely do not change when updating
  const airportCode = editAirportCode.value;

  // Potential attributes to be changed
  let airportName = editAirportName.value;
  let city = editCity.value;
  let adminDiv = editAdminDiv.value;
  let country = editCountry.value;


  console.log(`User entered ${airportName} ${city} ${adminDiv} ${country}`);

  if (airportName === getAirportInfo(htmlRow, 1)) {
    airportName = '';
  }

  if (city === getAirportInfo(htmlRow, 2)) {
    city = '';
  }

  if (adminDiv === getAirportInfo(htmlRow, 3)) {
    adminDiv = '';
  }

  if (country === getAirportInfo(htmlRow, 4)) {
    country = '';
  }

  if (airportName === '' && city === '' && adminDiv === '' && country === '') {
    // eslint-disable-next-line no-restricted-globals
    alert('You have not made any changes to any fields!');
    return;
  }

  const url = `../api/admin/getDestinations?airportCode=${airportCode}&airportName=${airportName}`
  + `&city=${city}&administrativeDivision=${adminDiv}&country=${country}`;

  fetch(url, {
    method: 'PATCH'
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status !== 200) {
        alert('Could not update destination!');
      } else {
        return response.json;
      }
    })
    .then((response) => {
      if (response.deleteDestination === true) {
        alert('Destination updated!');
      }
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }).catch((err) => console.log(err));
}

function prepInputFields(htmlRow) {
  const editAirportCode = document.getElementById('editAirportCode');
  const editAirportName = document.getElementById('editAirportName');
  const editCity = document.getElementById('editCity');
  const editAdminDiv = document.getElementById('editAdministrativeDivision');
  const editCountry = document.getElementById('editCountry');

  editAirportCode.value = getAirportInfo(htmlRow, 0);
  editAirportName.value = getAirportInfo(htmlRow, 1);
  editCity.value = getAirportInfo(htmlRow, 2);
  editAdminDiv.value = getAirportInfo(htmlRow, 3);
  editCountry.value = getAirportInfo(htmlRow, 4);
  // Move the input fields
  M.updateTextFields();
}

function removeDestination(data) {
  const url = `../api/admin/deleteDestination?airportCode=${data}`;

  fetch(url, {
    method: 'DELETE'
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status !== 200) {
        alert('Could not delete destination!');
      } else {
        return response.json;
      }
    })
    .then((response) => {
      if (response.deleteDestination === true) {
        alert('Destination deleted!');
      }
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }).catch((err) => console.log(err));
}

// eslint-disable-next-line no-unused-vars
function deleteDestination(elem) {
  const trElement = elem.parentElement.parentElement;
  let tr = document.getElementsByTagName('tr');
  tr = Array.prototype.slice.call(tr);
  rowVal = tr.indexOf(trElement);
  const rowData = document.getElementsByTagName('tr');
  const rowInformation = rowData[rowVal];
  const airportCode = getAirportInfo(rowInformation, 0);
  const Modalelem = document.querySelectorAll('.modal');
  const instance = M.Modal.init(Modalelem[0]);
  const acceptBtn = document.getElementById('acceptDelete');

  acceptBtn.addEventListener('click', () => { removeDestination(airportCode); });

  instance.open();
}

// eslint-disable-next-line no-unused-vars
function editDestination(elem) {
  const modal = document.getElementsByClassName('modal');
  const trElement = elem.parentElement.parentElement;
  let tr = document.getElementsByTagName('tr');
  tr = Array.prototype.slice.call(tr);
  rowVal = tr.indexOf(trElement);
  const rowData = document.getElementsByTagName('tr');
  const rowInformation = rowData[rowVal];
  const airportCode = getAirportInfo(rowInformation, 0);
  const Modalelem = document.querySelectorAll('.modal');
  const instance = M.Modal.init(Modalelem[1]);
  const editBtn = document.getElementById('acceptEdit');

  prepInputFields(rowInformation);

  editBtn.addEventListener('click', () => { updateDestination(rowInformation); });
  instance.open();
}

function addRow(entry, count) {
  const tr = document.createElement('tr');

  const airportCode = document.createElement('td');
  const airportName = document.createElement('td');
  const city = document.createElement('td');
  const administrativeDivision = document.createElement('td');
  const country = document.createElement('td');
  const editBtn = document.createElement('td');
  const deleteBtn = document.createElement('td');

  airportCode.classList.add('center-align');
  airportName.classList.add('center-align');
  city.classList.add('center-align');
  administrativeDivision.classList.add('center-align');
  country.classList.add('center-align');
  editBtn.classList.add('center-align');
  deleteBtn.classList.add('center-align');

  tr.id = count;
  airportCode.innerText = entry.airportCode;
  airportName.innerText = entry.airportName;
  city.innerText = entry.city;
  administrativeDivision.innerText = entry.administrativeDivision;
  country.innerText = entry.country;
  editBtn.innerHTML = '<data-target="editModal" class="btn orange modal-trigger" type="button" onclick="editDestination(this)"> <i class="material-icons">edit</i ></button>';
  deleteBtn.innerHTML = '<data-target="deleteModal" class="btn red modal-trigger" type="button" onclick="deleteDestination(this)"> <i class="material-icons">delete</i ></button>';

  tr.appendChild(airportCode);
  tr.appendChild(airportName);
  tr.appendChild(city);
  tr.appendChild(administrativeDivision);
  tr.appendChild(country);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  return tr;
}

function populateDestinationTable(list) {
  const tbody = document.getElementById('tBody');
  const label = document.getElementById('noDestinationsFound');
  const count = document.getElementById('numDestinations');
  tbody.innerHTML = '';

  if (list === undefined || list.count === 0) {
    label.style.display = 'block';
    return;
  }
  label.style.display = 'none';

  document.getElementById('numDestinations').innerHTML = 'test';
  list.destinations.forEach((element, index) => {
    const tr = addRow(element, index);
    tbody.appendChild(tr);
  });

  count.innerHTML = `<em>${list.count} results returned</em>`;
}

function searchForDestinations() {
  const airportCode = document.getElementById('airportCode').value;
  const city = document.getElementById('city').value;
  const adminDivision = document.getElementById('administrativeDivision').value;
  const country = document.getElementById('country').value;


  const url = `../api/admin/getDestinations?airportCode=${airportCode}&city=${city}`
  + `&administrativeDivision=${adminDivision}&country=${country}`;
  fetch(url)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populateDestinationTable(data);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
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
  const logOutButton = document.getElementById('logOutButton');
  const searchButton = document.getElementById('searchButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);
  searchButton.addEventListener('click', searchForDestinations);
}


window.addEventListener('DOMContentLoaded', () => {
  // document.getElementById('numDestinations').innerHTML = 'hello all';
  addEventListeners();
}, false);
