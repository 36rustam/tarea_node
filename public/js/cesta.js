import { Cesta } from './clases/Cesta.js';
console.log('cesta.js dice hola');

// Asignamos los elementos;
const row = document.querySelectorAll('.bek-cesta-unidad');//pArray el producto;
const cantidad = document.querySelectorAll('.bek-cantidad');//pArray la cantidad;
const precio = document.querySelectorAll('.bek-precio');//pArray el precio del producto;
const subTotal = document.querySelectorAll('.bek-sub-total');//pArray la suma subtotal del producto;
const total = document.querySelector('.bek-total-cesta');//donde estará la summs total;
const botons = document.querySelectorAll('.bek-btn-mas-menos');//pArray los butones;
const botonMas = document.querySelectorAll('.bek-mas');//pArray;
const botonMenos = document.querySelectorAll('.bek-menos');//pArray;
// Un select para cambiar la moneda;
const moneda = document.querySelector('#bek-moneda');//dependiendo da la pais;
const monedaNativa='UAH';

// bueno, es un host, pero sirve para dar la ruta 
// al nuestro severdoe para pobeten los datos;
const rutaPrecioReal='http://localhost:3000';

const paramCesta = {//parametros para constructor del cesta
    row: row,
    precio: precio,
    cantidad: cantidad,
    subTotal: subTotal,
    total: total,
    botonMas: botonMas,
    botonMenos: botonMenos,
    moneda: moneda,
    rutaPrecioReal:rutaPrecioReal,
    monedaNativa:monedaNativa,
};

// El ejemplar del cesta;
const cesta = new Cesta(paramCesta);

// El primer cargo
cesta.loader();

// Botones que cambien la cantidad del producto en cesta;
botons.forEach(element => {
    element.addEventListener('click', (e) => {
        try {
            cesta.pulsarMM(e, cantidad);
        }
        catch (err) {
            console.error(err);
        }
        e.stopPropagation();
    });
});

// La funcionalodad para cambiar la moneda;
moneda.addEventListener('change', () => {
    cesta.loader();
});