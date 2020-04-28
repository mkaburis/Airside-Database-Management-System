function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function addRow(entry, count) {

  console.log(entry.airportCode);
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
  administrativeDivision.classList.add('center-align')
  country.classList.add('center-align');
  editBtn.classList.add('center-align');
  deleteBtn.classList.add('center-align');

  tr.id = count;
  airportCode.innerText = entry.airportCode;
  airportName.innerText = entry.airportName;
  city.innerText = entry.city;
  administrativeDivision.innerText = entry.administrativeDivision;
  country.innerText = entry.country;
  editBtn.innerHTML = '<button class="btn orange" type="button" id="editButton"> <i class="material-icons">edit</i ></button >';
  deleteBtn.innerHTML = '<button class="btn red" type="button" id="searchButton"> <i class="material-icons">delete</i ></button >';

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

  // console.log(list.destinations[0]);

  document.getElementById('numDestinations').innerHTML = 'test';
  list.destinations.forEach((element, index) => {
    const tr = addRow(element, index);
    tbody.appendChild(tr);
  });

  count.innerHTML = `<em>${list.count} results returned</em>`

  console.log(list.count);

  

  // list.destinations.forEach((element, index) => {
  //   const tr = addRow(element, index);
  //   tbody.appendChild(tr);
  // });
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
  // const saveButton = document.getElementById('saveButton');
  const searchButton = document.getElementById('searchButton');

  // saveButton.addEventListener('click', addDestination);
  searchButton.addEventListener('click', searchForDestinations);
}


window.addEventListener('DOMContentLoaded', () => {
  // document.getElementById('numDestinations').innerHTML = 'hello all';
  addEventListeners();
}, false);
