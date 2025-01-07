let users = JSON.parse(localStorage.getItem('users')) || {}; // Load users from Local Storage

function showSignup() {
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const signupError = document.getElementById('signup-error');

    signupError.textContent = '';

    if (username in users) {
        signupError.textContent = 'Username already exists.';
    } else if (username && password) {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users)); // Simpan user di Local Storage
        alert('Account created successfully!');
        showLogin();
    } else {
        signupError.textContent = 'Please fill out all fields.';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');

    error.textContent = '';

    if (users[username] === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username); // Simpan user yang login di Local Storage
        window.location.href = 'menu.html'; // Redirect ke halaman menu.html setelah login
    } else {
        error.textContent = 'Invalid username or password.';
    }
}

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'index.html'; // Redirect langsung ke menu.html jika sudah login
    }
}

// Cek status login saat halaman pertama kali dimuat
// checkLoginStatus();

window.addEventListener("DOMContentLoaded", () => {checkLoginStatus});
