function getProfileName() {
  const url = '../api/profile';

  fetch(url, {
    method: 'GET'
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.status === 401) {
        window.location = '/login';
      } else {
        return response.json();
      }
    })
    .then((response) => {
      const icon = document.getElementById('profile_name').innerHTML;
      document.getElementById('profile_name').innerHTML = `${icon} ${response.name}`;
    }).catch((err) => console.log(err));
}

function addEventListeners() {
  const logOutButton = document.getElementById('logOutButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  getProfileName();
}, false);
