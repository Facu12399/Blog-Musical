document.addEventListener('DOMContentLoaded', () => {
    const register = document.querySelector('#registerUsuario');

    register.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name').value;
        const surname =  document.querySelector('#surname').value;
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const birthdate = document.querySelector('#birthdate').value;
        const genare = document.querySelector('input[name="genero"]:checked').value;
        //const imageName = document.querySelector('#perfil').files[0];

        try {
            const response = await axios.post('http://localhost:3000/register', {
                name: name,
                surname: surname,
                username: username,
                email: email,
                password: password,
                birthdate: birthdate,
                genare: genare
            });
            const modal = document.querySelector('.modal');
                // Mostrar el modal después de un registro exitoso
                console.log('Modal encontrado:', modal);
                modal.style.display = 'flex';

                // Configurar el cierre del modal
                const closeModal = document.querySelector('#modal_close');
                closeModal.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = '../index.html';
                });
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    });
});
