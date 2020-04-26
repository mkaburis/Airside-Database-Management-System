document.addEventListener('DOMContentLoaded', () => {
  console.log('hello world');

  document.getElementById('current_user').innerHTML = 'New UserName';
  document.getElementById('current_permissions').innerHTML = 'New Permissions';
  const url = '../api/profile';

  fetch(url, {
    method: 'POST'
  })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById('current_user').innerHTML = response.name;
    }).catch((err) => console.log(err));
});
