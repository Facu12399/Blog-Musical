document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#login-usuario').addEventListener('submit', async (e) => {
        e.preventDefault()

        const userEmail = document.querySelector('#username-email').value
        const password = document.querySelector('#password').value

        try {
            const response = await axios.post('http://localhost:3000/login', { username: userEmail, password });
            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', response.data.token);
            // Redirigir a la raíz, que es la ruta protegida
            window.location.href = 'home.html';
        } catch (err) {
            errorElement.textContent = 'Credenciales incorrectas';
        }
    })
})