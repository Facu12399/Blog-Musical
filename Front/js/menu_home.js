const settings = document.getElementById('img-settings');
const desplegable = document.getElementById('desplegue');


settings.addEventListener('click',()=>{
    if(desplegable.style.display == 'flex'){
        desplegable.style.display = 'none';
    } else{
        desplegable.style.display = 'flex';
    }
})
