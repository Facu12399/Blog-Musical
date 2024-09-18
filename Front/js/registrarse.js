document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#registerUsuario').addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', document.querySelector('#name').value);
            formData.append('surname', document.querySelector('#surname').value);
            formData.append('username', document.querySelector('#username').value);
            formData.append('email', document.querySelector('#email').value);
            formData.append('password', document.querySelector('#password').value);
            formData.append('birthdate', document.querySelector('#birthdate').value);
            formData.append('genare', document.querySelector('input[name="genero"]:checked').value);
            formData.append('imageName', document.querySelector('#perfil').files[0]);

            const response = await axios.post('http://localhost:3000/register', formData);
            const modal = document.querySelector('.modal');
            modal.style.display = 'flex';

            // Configurar el cierre del modal
            const closeModal = document.querySelector('#modal_close');
            closeModal.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '../index.html';
            });

        } catch (error) {
            // if (error.response && error.response.status === 422) {
            //     // Maneja errores de validación
            //     const errores = error.response.data.errores;
            //     let mensajesdeError = '<ul>';
            //     const warningPass = document.querySelector('#warningPass');
            //     errores.forEach(error => {
            //         if (error.path === 'password') {
            //             warningPass.style.display = 'inline';
            //             mensajesdeError += `<li>${error.msg}</li>`;
            //         }
            //     });
            //     mensajesdeError += '</ul>';
            //     warningPass.addEventListener('click', () => {
            //         const showWarningPass = document.querySelector('#warning-password');
            //         showWarningPass.innerHTML = mensajesdeError;
            //         showWarningPass.style.display = 'block';
            //     });
            // } else {
            //     console.error("Error en la solicitud:", error.message);
            // }
            if (error.response && error.response.status === 422) {
                // Maneja errores de validación
                const errores = error.response.data.errores;
                let mensajesdeError = "<ul>";
                errores.forEach(error => {
                    mensajesdeError += `<li>${error.msg}</li>`;
                });
                mensajesdeError += "</ul>";
                document.querySelector('#mensajesValidacion').innerHTML = mensajesdeError;
            } else {
                console.error("Error en la solicitud", error.message);
            }
        }
    });
    
});
