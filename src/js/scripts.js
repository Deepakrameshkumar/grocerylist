document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Redirect to the dashboard page
            window.location.href = 'src/dashboard.html';
        })
        .catch((error) => {
            errorMessage.textContent = 'Invalid username or password';
        });
});