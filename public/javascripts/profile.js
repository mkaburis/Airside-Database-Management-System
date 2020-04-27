
let userName;

function checkNewPasswordMatch(pwd1, pwd2) {
  if (pwd1 === pwd2) { return true; }
  return false;
}

function updatePassword() {
  const currentPassword = document.getElementById('current_password');
  const newPassword = document.getElementById('new_password');
  const confirmPassword = document.getElementById('confirm_password');
  const currentPasswordSpan = document.getElementById('currentPasswordSpan');
  const newPasswordSpan = document.getElementById('newPasswordSpan');
  const confirmPasswordSpan = document.getElementById('confirmPasswordSpan');
  const passwordMatchSpan = document.getElementById('passwordMatchSpan');


  const currentPwdVal = currentPassword.value;
  const newPwdVal = newPassword.value;
  const confirmPwdVal = confirmPassword.value;

  if (!currentPassword.checkValidity()) {
    currentPasswordSpan.style.display = 'block';
  } else {
    currentPasswordSpan.style.display = 'none';
  }
  if (!newPassword.checkValidity()) {
    newPasswordSpan.style.display = 'block';
  } else {
    newPasswordSpan.style.display = 'none';
  }
  if (!confirmPassword.checkValidity()) {
    confirmPasswordSpan.style.display = 'block';
  } else {
    confirmPasswordSpan.style.display = 'none';
  }


  if (checkNewPasswordMatch(newPwdVal, confirmPwdVal) === true) {
    passwordMatchSpan.style.display = 'none';

    const url = `../api/profile/update?username=${userName}&currentpassword=${currentPwdVal}&newpassword=${newPwdVal}`;
    fetch(url, {
      method: 'POST'
    })
    // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status === 401) {
          alert('Could not confirm password!');
        } else {
          return response.json;
        }
      })
      .then((response) => {
        if (response.changePassword === true) {
          alert('Password updated');
        }
      }).catch((err) => console.log(err));
  } else {
    passwordMatchSpan.style.display = 'block';
  }
}

function getUserInfo() {
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
      document.getElementById('current_user').innerHTML = response.name;
      userName = response.name;
    }).catch((err) => console.log(err));
}

function addEventListeners() {
  const updateButton = document.getElementById('updatePasswordButton');

  updateButton.addEventListener('click', updatePassword);
}

// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('current_user').innerHTML = 'New UserName';
//   document.getElementById('current_permissions').innerHTML = 'New Permissions';
//   const url = '../api/profile';

//   fetch(url, {
//     method: 'GET'
//   })
//     // eslint-disable-next-line consistent-return
//     .then((response) => {
//       if (response.status === 401) {
//         window.location = '/login';
//       } else {
//         return response.json();
//       }
//     })
//     .then((response) => {
//       document.getElementById('current_user').innerHTML = response.name;
//       userName = response.name;
//     }).catch((err) => console.log(err));
// });

window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  getUserInfo();
}, false);
