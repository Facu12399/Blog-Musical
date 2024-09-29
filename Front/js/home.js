document.addEventListener('DOMContentLoaded', async () => { 

    const token = localStorage.getItem('access_token');
    console.log(token);
    try {
        const response = await axios.get('http://localhost:3000/protected', {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        if(response.status == 200){
            console.log('Estas en la ruta protegida');
            const id = localStorage.getItem('id');
            datosUser(id);
            changePerfil(id);
            logout();
            people(id);
        }
    } catch (error) {
        console.log('El error es el sig.:', error);
    }
})

const datosUser = async (id) => {
    const response = await axios.get(`http://localhost:3000/usuarios/${id}`);

    const username = document.querySelector('#user-name');
    username.innerText = response.data.username;

    const nameComplete = document.querySelector('#nombre');
    nameComplete.innerText = response.data.name + ' ' + response.data.surname;

    const perfil = document.querySelector('#perfil');
    if(response.data.imageName == null){
        perfil.src = `../img/perfil-defecto.webp`;
    } else {
        perfil.src = `../../Back/uploads/${response.data.imageName}`;
    }

    const perfilPost = document.querySelector('#perfil-post');
    perfilPost.src = `../../Back/uploads/${response.data.imageName}`;
    if(response.data.imageName == null){
        perfilPost.src = `../img/perfil-defecto.webp`;
    } else {
        perfilPost.src = `../../Back/uploads/${response.data.imageName}`;
    }
}

const changePerfil = async (id) => {

    const response = await axios.get(`http://localhost:3000/usuarios/${id}`);

    const modal = document.querySelector('.modal');

    perfil.addEventListener('click', () => {
        const change = document.querySelector('#change');
        const back = document.querySelector('#back');
        const modalContainer1 = document.querySelector('.modalContainer1');
        const modalContainer2 = document.querySelector('.modalContainer2');
        modal.style.display = 'flex'; 

        const photoModal = document.querySelector('#photoModal')
        if(response.data.imageName == null){
            photoModal.src = `../img/perfil-defecto.webp`;
        } else {
            photoModal.src = `../../Back/uploads/${response.data.imageName}`;
        }
        change.addEventListener('click', () => {
            modalContainer2.style.display = 'flex';
            modalContainer1.style.display = 'none'; 

            const photoModalChange = document.querySelector('#photoModalChange');
            if(response.data.imageName == null){
                photoModalChange.src = `../img/perfil-defecto.webp`;
            } else {
                photoModalChange.src = `../../Back/uploads/${response.data.imageName}`;
            }

            const cancel = document.querySelector('#cancel');

            cancel.addEventListener('click', () => {
                modalContainer2.style.display = 'none';
                modalContainer1.style.display = 'flex';
            })

            const changePhoto = document.querySelector('#changePhoto')
            const updatePhoto = document.querySelector('#updatePhoto');
            changePhoto.addEventListener('change', (e) => {
                if(e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        photoModalChange.src = e.target.result;
                    }
                    reader.readAsDataURL(e.target.files[0])
                    updatePhoto.addEventListener('click', async () => {
                        const formData = new FormData();
                        formData.append('imageName', e.target.files[0]);

                        await axios.put(`http://localhost:3000/usuariosImage/${response.data.id}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            console.log('Imagen actualizada con éxito');
                        })
                        .catch(error => {
                            console.error('Error al actualizar la imagen', error);
                            // Aquí puedes mostrar el modal de error
                        });
                    });
                    
                } else {
                    photoModalChange.src = `../../Back/uploads/${response.data.imageName}`;
                }
            })
        })
        back.addEventListener('click', () => {
            modal.style.display = 'none';
        })
    })
}

const people = async (id) => {
    const asideRight = document.querySelector('.right');
    let data = '<h4>Usuarios</h4>';

    try {
        const response = await axios.get('http://localhost:3000/usuarios');
        if (response.status == 200) {
            const limitedUsers = response.data.slice(0, 3);
            limitedUsers.forEach(user => {
                if (String(user.id) !== String(id)) { 
                    let imageUrl = user.imageName ? `../../Back/uploads/${user.imageName}` : '../img/perfil-defecto.webp';
                    data += `
                    <div class="people">
                        <div class="data-people">
                            <img class="perfil-people" src="${imageUrl}" alt="">
                            <div class="name-people">
                                <span class="user-name-people">${user.username}</span>
                                <span class="nombre-people">${user.name} ${user.surname}</span>
                            </div>
                        </div>
                    </div>
                    `;
                }
            });
            asideRight.innerHTML = data;
        }
    } catch (error) {
        console.error('Hay un error =>', error);
    }
}

const logout = async () => {
    try {
        const closeSesion = document.querySelector('#closeSesion');

        closeSesion.addEventListener('click', async () => {

            const response = await axios.post('http://localhost:3000/logout')
            if (response.status === 200) {
                console.log('Sesión cerrada exitosamente');
                localStorage.removeItem('id');
                localStorage.removeItem('access_token');
                localStorage.removeItem('token');
                // Redirige al usuario a la página de inicio de sesión o a otra página
                window.location.href = '../index.html';
            }
        })
    } catch (error) {
        console.error('Error al logoutearse', error);
    }
}
/*      

        
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }

    try {
        const closeSesion = document.querySelector('#closeSesion');

        closeSesion.addEventListener('click', async () => {

            const response = await axios.post('http://localhost:3000/logout')
            if (response.status === 200) {
                console.log('Sesión cerrada exitosamente');
                // Redirige al usuario a la página de inicio de sesión o a otra página
                window.location.href = '../index.html';
            }
        })
    } catch (error) {
        console.error('Error al logoutearse', error);
    }
});
*/
/*
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('No se encontró el ID del usuario.');
        }

        const userData = await getUserData(userId);
        updateUserInfo(userData);
        setupProfileClickEvent(userData);
    } catch (error) {
        console.error(error.message);
    }

    async function getUserData(userId) {
        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`);
        return response.data;
    }

    function updateUserInfo(data) {
        const username = document.querySelector('#user-name');
        username.innerText = data.username;

        const nameComplete = document.querySelector('#nombre');
        nameComplete.innerText = `${data.name} ${data.surname}`;

        const perfil = document.querySelector('#perfil');
        perfil.src = data.imageName ? `../../Back/uploads/${data.imageName}` : `../img/perfil-defecto.webp`;
    }

    function setupProfileClickEvent(data) {
        const perfil = document.querySelector('#perfil');
        const modal = document.querySelector('.modal');

        perfil.addEventListener('click', () => {
            modal.style.display = 'flex';
            updateModalPhoto(data.imageName);

            const change = document.querySelector('#change');
            change.addEventListener('click', () => {
                toggleModalContainers();
                setupChangePhotoEvent(data.id);
            });
        });
    }

    function updateModalPhoto(imageName) {
        const photoModal = document.querySelector('#photoModal');
        photoModal.src = imageName ? `../../Back/uploads/${imageName}` : `../img/perfil-defecto.webp`;
    }

    function toggleModalContainers() {
        const modalContainer1 = document.querySelector('.modalContainer1');
        const modalContainer2 = document.querySelector('.modalContainer2');
        modalContainer1.style.display = 'none';
        modalContainer2.style.display = 'flex';

        const cancel = document.querySelector('#cancel');
        cancel.addEventListener('click', () => {
            modalContainer2.style.display = 'none';
            modalContainer1.style.display = 'flex';
        });
    }

    function setupChangePhotoEvent(userId) {
        const changePhoto = document.querySelector('#changePhoto');
        const updatePhoto = document.querySelector('#updatePhoto');
        const photoModalChange = document.querySelector('#photoModalChange');

        changePhoto.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    photoModalChange.src = e.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);

                updatePhoto.addEventListener('click', async () => {
                    const formData = new FormData();
                    formData.append('imageName', e.target.files[0]);

                    try {
                        await axios.put(`http://localhost:3000/usuariosImage/${userId}`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        });
                        console.log('Imagen actualizada con éxito');
                    } catch (error) {
                        console.error('Error al actualizar la imagen', error);
                        // Aquí puedes mostrar el modal de error
                    }
                });
            }
        });
    }
});
*/