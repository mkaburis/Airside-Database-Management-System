function login() {
  const loginInput = document.getElementById('loginInput');
  const passwordInput = document.getElementById('passwordInput');
  const usernameSpan = document.getElementById('usernameSpan');
  const passwordSpan = document.getElementById('passwordSpan');

  const loginVal = loginInput.value;
  const passwordVal = passwordInput.value;

  if (!loginInput.checkValidity()) {
    usernameSpan.style.display = 'block';
  } else {
    usernameSpan.style.display = 'none';
  }
  if (!passwordInput.checkValidity()) {
    passwordSpan.style.display = 'block';
  } else {
    passwordSpan.style.display = 'none';
  }

  const url = `../api/auth/login?username=${loginVal}&password=${passwordVal}`;

  fetch(url, {
    method: 'POST',
    redirect: 'follow'
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.auth === true) {
        window.location.href = response.dashUrl;
      }
    });
}
function addEventListeners() {
  const loginBtn = document.getElementById('loginBtn');

  loginBtn.addEventListener('click', login);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
}, false);
