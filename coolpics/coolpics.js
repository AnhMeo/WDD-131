const menuToggler = document.querySelector('button')

function toggleMenu () {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('hide');
}

function handleResize () {
    const menu = document.querySelector('.menu');
    if (window.innerWidth > 1000){
        menu.classList.remove('hide');
    }   else {
        menu.classList.add('hide');
    }
}

menuToggler.addEventListener('click', toggleMenu);
window.addEventListener('resize', handleResize);