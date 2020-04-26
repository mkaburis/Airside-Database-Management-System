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
