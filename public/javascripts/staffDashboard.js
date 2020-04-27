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
      document.getElementById('profile_name').innerHTML = response.name;
    }).catch((err) => console.log(err));
}

function addEventListeners() {
  const profileButton = document.getElementById('profileButton');

  // eslint-disable-next-line no-undef
  profileButton.addEventListener('click', profile);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  getProfileName();
}, false);
