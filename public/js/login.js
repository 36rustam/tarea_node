// el primero cargo de la pagina
window.onload=fuCambiarTitle();
// title
// evento
let buttones=document.getElementsByClassName('nav-link-login');
console.log(typeof buttones);
// to array
buttones=Object.values(buttones);
console.log(buttones);
buttones.forEach(el => {
el.addEventListener('click',fuCambiarTitle)
});


function fuCambiarTitle(){
    const active=document.getElementsByClassName('active');
    document.title=active[1].innerHTML;
    // console.log(active[1].innerHTML);
};