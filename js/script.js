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

// Function to load the footer component
function loadFooter(){
    fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading the footer:', error));
}

// Call the function to load the navbar when the script runs
loadNavbar();
loadFooter();
