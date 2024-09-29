/*document.addEventListener('DOMContentLoaded', () => {
  axios.get('/accessToken')
  .then(response => {
    const user = response.data.user;
    if (user) {
      console.log('User authenticated:', user);
      // Aquí puedes actualizar la interfaz de usuario según sea necesario
      window.location.href('./home.html')
    } else {
      console.log('No user authenticated');
      // Redirigir a la página de login o mostrar un mensaje
      window.location.href = './login.html';
      console.log('No user authenticated');
    }
  })
  .catch(error => {
    console.error('Error verifying token:', error);
    // Redirigir a la página de login o mostrar un mensaje
    window.location.href = './login.html';
  });  

})*/