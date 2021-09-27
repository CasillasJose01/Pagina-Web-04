document.addEventListener('DOMContentLoaded',function(){
    crearGaleria();
});
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1 ; i <= 12 ; i++){
        const imagen = document.createElement('IMG');
        imagen.src=`build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Agregar la funcion de mostrar imagen
        imagen.onclick = mostrarImagen;

        const lista=document.createElement('LI');
        lista.appendChild(imagen);
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId);

    const imagen = document.createElement('IMG');
    imagen.src=`build/img/grande/${id}.webp`;
    

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function(){
        overlay.remove();
    }
    //Boton para cerrar imagen 
    const cerrar = document.createElement('P');
    cerrar.textContent = 'X';
    cerrar.classList.add('btn-cerrar');
    overlay.appendChild(cerrar);

    //Cuando se presiona se cierra la imagen
    cerrar.onclick = function(){
        overlay.remove();
    }

    //Mostrar en el html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}