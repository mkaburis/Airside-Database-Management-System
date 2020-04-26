function addEventListeners() {
  const profileButton = document.getElementById('profileButton');

  // eslint-disable-next-line no-undef
  profileButton.addEventListener('click', profile);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
