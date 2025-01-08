const { signup, login, hashPassword } = require('./script');

beforeEach(() => {
    // Mock localStorage
    global.localStorage = {
        getItem: jest.fn().mockReturnValue(null),
        setItem: jest.fn(),
    };

    // Mock alert
    global.alert = jest.fn();
});

describe('Pengujian fungsi hashPassword', () => {
    test('Harus menghasilkan hash yang konsisten untuk password yang sama', async () => {
        const password = '123456';
        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);
        expect(hash1).toBe(hash2);
    });

    test('Hash untuk password yang berbeda harus berbeda', async () => {
        const hash1 = await hashPassword('password1');
        const hash2 = await hashPassword('password2');
        expect(hash1).not.toBe(hash2);
    });
});

describe('Pengujian fungsi signup', () => {
    test('Harus menambahkan user baru jika username belum ada', async () => {
        global.localStorage.getItem.mockReturnValueOnce(JSON.stringify({})); // Mock empty users

        document.body.innerHTML = `
            <input id="signup-username" value="user1">
            <input id="signup-password" value="pass123">
            <div id="signup-error"></div>
        `;

        await signup();
        expect(global.localStorage.setItem).toHaveBeenCalledWith(
            'users',
            JSON.stringify({ user1: expect.any(String) })
        );
        expect(global.alert).toHaveBeenCalledWith('Account created successfully!');
    });

    test('Harus memberikan error jika username sudah ada', async () => {
        global.localStorage.getItem.mockReturnValueOnce(
            JSON.stringify({ user1: 'hashedpass123' })
        );

        document.body.innerHTML = `
            <input id="signup-username" value="user1">
            <input id="signup-password" value="pass123">
            <div id="signup-error"></div>
        `;

        await signup();
        expect(document.getElementById('signup-error').textContent).toBe('Username already exists.');
    });
});

describe('Pengujian fungsi login', () => {
    test('Harus berhasil login jika username dan password benar', async () => {
        global.localStorage.getItem.mockReturnValueOnce(
            JSON.stringify({ user1: await hashPassword('pass123') })
        );

        document.body.innerHTML = `
            <input id="username" value="user1">
            <input id="password" value="pass123">
            <div id="error"></div>
        `;

        await login();
        expect(global.localStorage.setItem).toHaveBeenCalledWith('loggedInUser', 'user1');
        expect(global.alert).toHaveBeenCalledWith('Login successful!');
    });

    test('Harus gagal login jika username atau password salah', async () => {
        global.localStorage.getItem.mockReturnValueOnce(
            JSON.stringify({ user1: await hashPassword('pass123') })
        );

        document.body.innerHTML = `
            <input id="username" value="user1">
            <input id="password" value="wrongpass">
            <div id="error"></div>
        `;

        await login();
        expect(document.getElementById('error').textContent).toBe('Invalid username or password.');
    });
});
