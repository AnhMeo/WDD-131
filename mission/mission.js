const themeSelector = document.querySelector('select');

function changeTheme() {
    let selected_value = themeSelector.value;
    const logoImage = document.querySelector('.logo');

    if (selected_value == 'dark-mode'){
        document.body.classList.add('dark');
        logoImage.setAttribute('src', 'byui-logo_white.png'); 
    }
    else {
        document.body.classList.remove('dark');
        logoImage.setAttribute('src', 'byui-logo_blue.webp');
    }
}

themeSelector.addEventListener('change', changeTheme);