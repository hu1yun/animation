
function prepareSideMenu(){
    let menu = document.getElementById('menu');
    let toggler = document.getElementById('menu-toggler');
    toggler.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

}

$(document).ready(() => {
    prepareSideMenu();
});