import { formatPrecio,masCan,menosCan,total,hToFloat, cambiaCalculos } from './helpers.js';
console.log('cesta.js dice hola');

// Botom para modificar la cantidad;
const butMM = document.querySelectorAll('.btn-mas-menos');
// En total para cada producto
const subTotal2 = document.querySelectorAll('.sub-total');
// La suma total;
let cajaTotal2 = document.querySelector('.total-cesta');

// La fila (HTML) para cada produccto;
const cestaUnidad=document.querySelectorAll('.cesta-unidad');

// evento para los botones(+/-)
butMM.forEach(element => {
    element.addEventListener('click', (e) => {
        let row = element.parentElement.parentElement;
        // console.log(element.parentElement.parentElement);
        let cantidad = e.target.parentElement.children[1].textContent;
        // console.log(cantidad);
        let signo = element.dataset.but;
        signo === 'mas' ? masCan(element,e) : menosCan(element, cantidad,e);
        cambiaCalculos(row,subTotal2,cajaTotal2);
    });
});

// La primera calculacción;
cestaUnidad.forEach(element => {
    cambiaCalculos(element,subTotal2,cajaTotal2);
    // console.log('spanPrecio '+element.childNodes[7].childNodes[1]);
    const spanPrecio=element.childNodes[7].childNodes[1];
    // Al forma dineral;
    formatPrecio(spanPrecio);
});

