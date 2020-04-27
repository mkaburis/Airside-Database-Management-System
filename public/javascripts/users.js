function populateTable(data) {
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
    .then((response) => populateTable(response))
    .catch((err) => console.log(err));
}

function addEventListeners() {
  const saveButton = document.getElementById('saveButton');

  saveButton.addEventListener('click', addUser);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  const select = document.querySelectorAll('select');
  const instances = M.FormSelect.init(select);

  const tabs = document.querySelector('.tabs');
  const instance = M.Tabs.init(tabs, {});
}, false);
