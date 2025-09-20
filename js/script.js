// Function to load the navbar component
function loadNavbar() {
  //load the navbar component into #navbar
  fetch('../components/navbar.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading the navbar:', error));
}

// Call the function to load the navbar when the script runs
loadNavbar();
