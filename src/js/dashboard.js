document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firestore
    const db = firebase.firestore();

    // Get the currently logged-in user
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in
            const userEmail = user.email;

            // Retrieve user information from Firestore
            db.collection('users').where('email', '==', userEmail).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // Get the user's name
                        const userName = doc.data().name;

                        // Display the user's name on the dashboard
                        const welcomeMessage = document.getElementById('welcome-message');
                        if (welcomeMessage) {
                            welcomeMessage.textContent = `Welcome, ${userName}!`;
                        } else {
                            console.error('Element with ID "welcome-message" not found.');
                        }

                        // Display additional user data
                        const userDataContainer = document.getElementById('user-data');
                        if (userDataContainer) {
                            userDataContainer.innerHTML = `
                                <p><strong>Email:</strong> ${doc.data().email}</p>
                                <p><strong>Name:</strong> ${doc.data().name}</p>
                                <!-- Add more fields as needed -->
                            `;
                        } else {
                            console.error('Element with ID "user-data" not found.');
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error retrieving user information:', error);
                });
        } else {
            // No user is signed in
            console.log('No user is signed in');
        }
    });
});