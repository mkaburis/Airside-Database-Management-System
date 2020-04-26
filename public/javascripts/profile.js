document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current_user').innerHTML = 'New UserName';
  document.getElementById('current_permissions').innerHTML = 'New Permissions';
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
    }).catch((err) => console.log(err));
});
