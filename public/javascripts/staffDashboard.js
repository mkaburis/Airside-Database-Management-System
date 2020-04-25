function addEventListeners() {
  const logOutButton = document.getElementById('logOutButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
