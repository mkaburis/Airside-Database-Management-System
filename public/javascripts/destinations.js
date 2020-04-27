
function addDestination() {
    //add functionality
}

function searchForDestinations() {
    //add functionality
}
function addEventListeners() {
  const saveButton = document.getElementById('saveButton');
  const searchButton = document.getElementById('searchButton');

  saveButton.addEventListener('click', addDestination);
  searchButton.addEventListener('click', searchForDestinations);
}


window.addEventListener('DOMContentLoaded', () => {
  addEventListeners();
  searchForDestinations();
}, false);
