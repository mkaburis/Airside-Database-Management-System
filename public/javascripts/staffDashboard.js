function addEventListeners() {
  const logOutButton = document.getElementById('logOutButton');
  const profileButton = document.getElementById('profileButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);


  // eslint-disable-next-line no-undef
  profileButton.addEventListener('click', profile);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
