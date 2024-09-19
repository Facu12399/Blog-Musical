document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#login-usuario').addEventListener('submit', async (e) => {
        e.preventDefault();

        const userEmail = document.querySelector('#username-email').value;
        const password = document.querySelector('#password').value;

        try {
            const response = await axios.post('http://localhost:3000/login', { username: userEmail, password });
            // Guardar el token y el ID del usuario en el almacenamiento local
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.dataValues.id);
            // Redirigir a la raíz, que es la ruta protegida
            window.location.href = 'home.html';
        } catch (err) {
            const errorElement = document.querySelector('#error-message');
            errorElement.textContent = 'Credenciales incorrectas';
        }
    });
});
