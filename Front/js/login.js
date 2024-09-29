document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#login-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userEmail = document.querySelector('#username-email').value;
    const password = document.querySelector('#password').value;

    try {
      const response = await axios.post('http://localhost:3000/login', { username: userEmail, password });
      console.log('Respuesta del servidor:', response.data);
      if(response.status == 200){
        const token = response.data.token;
        localStorage.setItem('access_token', token)
        const id = response.data.user.dataValues.id;
        localStorage.setItem('id', id)
        console.log(id);
        window.location.href = '../pages/home.html';
      }
    } catch (err) {
      console.log('Error en el login:', err);
      const errorElement = document.querySelector('#error-message');
      errorElement.textContent = 'Credenciales incorrectas';
    }
  });
});
