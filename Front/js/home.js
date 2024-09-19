document.addEventListener('DOMContentLoaded', async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('No se encontró el ID del usuario.');
        }
        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`);

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

        const perfilPost = document.querySelector('#perfil-post');
        perfilPost.src = `../../Back/uploads/${response.data.imageName}`;
        if(response.data.imageName == null){
            perfilPost.src = `../img/perfil-defecto.webp`;
        } else {
            perfilPost.src = `../../Back/uploads/${response.data.imageName}`;
        }
        
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
    }
});



