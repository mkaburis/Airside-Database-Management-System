function togglePermissions(id, level) {
  const url = `../api/admin/togglePermission?userId=${id}&level=${level}`;
  fetch(url, { method: 'put' })
    .then((response) => {
      if (response.status === 200) {
        const row = document.getElementById(id);
        const permissionTd = row.getElementsByClassName('permission')[0];
        permissionTd.innerText = (level === 'Admin') ? 'Staff' : 'Admin';
        return;
      }
      throw new Error('Error changing permission');
    })
    .catch((err) => console.log(err));
}

function deleteUser(id) {
  const url = `../api/admin/deleteUser?userId=${id}`;
  fetch(url, { method: 'DELETE' })
    .then((response) => {
      if (response.status === 200) {
        const row = document.getElementById(id);
        row.innerHTML = '';
        return;
      }
      alert('Error deleting user');
    })
    .catch((err) => console.log(err));
}

function addRow(entry, count) {
  const tr = document.createElement('tr');

  const id = document.createElement('td');
  const username = document.createElement('td');
  const permission = document.createElement('td');
  const editBtn = document.createElement('td');
  const deleteBtn = document.createElement('td');

  const entryId = entry.id;
  id.classList.add('center-align');
  username.classList.add('center-align');
  permission.classList.add('center-align');
  editBtn.classList.add('center-align');
  deleteBtn.classList.add('center-align');

  tr.id = entryId;
  id.innerText = count;
  username.innerText = entry.username;
  permission.innerText = entry.permission;
  permission.classList.add('permission');
  editBtn.innerHTML = '<button class="btn edit" type="button" id="searchButton"> <i class="material-icons">edit</i ></button >';
  deleteBtn.innerHTML = '<button class="btn delete" type="button" id="searchButton"> <i class="material-icons">delete</i ></button >';

  editBtn.addEventListener('click', () => togglePermissions(entryId, entry.permission));
  deleteBtn.addEventListener('click', () => deleteUser(entryId));

  tr.appendChild(id);
  tr.appendChild(username);
  tr.appendChild(permission);
  tr.appendChild(editBtn);
  tr.appendChild(deleteBtn);

  return tr;
}

function populateTable(list) {
  const tbody = document.getElementById('tBody');
  const label = document.getElementById('noUsersFound');
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

function searchForUsers() {
  const permissionSelect = document.getElementById('permissionSelect');
  const selectedValue = permissionSelect.value;


  const url = `../api/admin/getUsers?permission=${selectedValue}`;
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

function addUser() {
  const username = document.getElementById('username');
  const authRadioGroup = document.getElementById('authRadioGroup');
  const selectedAuth = authRadioGroup.querySelector('input[name="authRadio"]:checked').value;
  const usernameVal = username.value;

  if (!username.validity.valid) {
    return;
  }

  const url = `../api/admin/addUser?username=${usernameVal}&permission=${selectedAuth}`;
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

  saveButton.addEventListener('click', addUser);
  searchButton.addEventListener('click', searchForUsers);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  searchForUsers();
}, false);
