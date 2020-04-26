function logout() {
  const url = '../api/auth/logout';

  fetch(url, {
    method: 'POST',
    redirect: 'follow'
  }).then((response) => {
    if (response.redirected) {
      window.location.href = response.url;
    }
  });
}

function addEventListeners() {
  const logOutButton = document.getElementById('logOutButton');

  // defined in general.js
  // eslint-disable-next-line no-undef
  logOutButton.addEventListener('click', logout);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
