// Example test case for login functionality
function testLogin() {
    const username = 'admin';
    const password = 'password';
    
    // Simulate form submission
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));

    // Check if login was successful
    const errorMessage = document.getElementById('error-message').textContent;
    if (errorMessage === '') {
        console.log('Test passed: Login successful');
    } else {
        console.log('Test failed: ' + errorMessage);
    }
}

// Run the test
testLogin();