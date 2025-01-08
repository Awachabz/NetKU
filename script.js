let users = JSON.parse(localStorage.getItem('users')) || {}; // Load users from Local Storage

function showSignup() {
    document.querySelector('.login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-container').style.display = 'none';
    document.querySelector('.login-container').style.display = 'block';
}

async function hashPassword(password) {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const signupError = document.getElementById('signup-error');

    signupError.textContent = '';

    if (username.trim() === '' || password.trim() === '') {
        signupError.textContent = 'Please fill out all fields.';
        return;
    }

    users = JSON.parse(localStorage.getItem('users')) || {}; // Load users again from localStorage

    if (username in users) {
        signupError.textContent = 'Username already exists.';
    } else {
        const hashedPassword = await hashPassword(password);
        users[username] = hashedPassword;
        localStorage.setItem('users', JSON.stringify(users)); // Simpan user di Local Storage
        alert('Account created successfully!');
        showLogin();
    }
}

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');

    error.textContent = '';

    if (username.trim() === '' || password.trim() === '') {
        error.textContent = 'Please fill out all fields.';
        return;
    }

    users = JSON.parse(localStorage.getItem('users')) || {}; // Load users from localStorage

    const hashedPassword = await hashPassword(password);
    if (users[username] === hashedPassword) {
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
        window.location.href = 'menu.html'; // Redirect langsung ke menu.html jika sudah login
    }
}

function buyKuota(provider, harga) {
    alert(`Anda membeli kuota ${provider} seharga Rp${harga}.`);
}

module.exports = {
    signup,
    login,
    hashPassword
};

window.addEventListener("DOMContentLoaded", checkLoginStatus);
