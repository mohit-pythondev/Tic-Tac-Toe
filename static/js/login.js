document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form from submitting the traditional way

        const formData = new FormData(loginForm);
        fetch('/login', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';  // Redirect to the main page on successful login
            } else {
                return response.json().then(data => {
                    alert(data.error);  // Show alert message from server
                    document.getElementById('password').value = '';
                    document.getElementById('password').focus();
                });
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
