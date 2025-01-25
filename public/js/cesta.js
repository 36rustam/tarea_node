import { Cesta } from './clases/Cesta.js';
console.log('cesta.js dice hola');


// Asignamos los elementos necesitables;

//Cesta item; 
const row = document.querySelectorAll('.bek-cesta-unidad');//pArray (item del cesta);
const cantidad = document.querySelectorAll('.bek-cantidad');//pArray la cantidad del produto;
const precio = document.querySelectorAll('.bek-precio');//pArray el precio del producto;
// Cambiar cantidad; //botSalida para guardar los cambios;
const botons = document.querySelectorAll('.bek-btn-mas-menos');//pArray los butones;
const botonMas = document.querySelectorAll('.bek-mas');//pArray boton +;
const botonMenos = document.querySelectorAll('.bek-menos');//pArray boton -;
// Calculaciones
const subTotal = document.querySelectorAll('.bek-sub-total');//pArray total del cada item;
const total = document.querySelector('.bek-total-cesta');//donde estará la suma total;
// Avisos
const seAcabo = document.querySelectorAll('.bek-indisponible');//No está en el almacen;
const avisoCantidad = document.querySelectorAll('.bek-aviso-cantidad')//En almasen está menos que desea;
// Borrar sin cambios a DB; //botSalida para guardar los cambios;
const botBorrarArr = document.querySelectorAll('.bek-borrar-del-cesta');
// Todos los butones que da la salida del cesta;
// Para guardal los cambios a DB (reanovar);
const botSalida = document.querySelectorAll('.nav-link');

// Cambiar la moneda;
const moneda = document.querySelector('#bek-moneda');//dependiendo da la pais;
const monedaNativa = 'UAH'// o EUR o USD // ¿¿¿que moneda se use en DB???;

const host = 'http://localhost:3000';

const paramCesta = {//parametros para constructor del cesta

    //Cesta item; 
    row: row,
    cantidad: cantidad,
    precio: precio,

    // Cambiar cantidad; //botSalida para guardar los cambios;
    botons: botons,
    botonMas: botonMas,
    botonMenos: botonMenos,

    // Calculaciones
    subTotal: subTotal,
    total: total,

    // Avisos
    seAcabo: seAcabo,
    avisoCantidad: avisoCantidad,

    // Borrar sin cambios a DB; //botSalida para guardar los cambios;
    botBorrarArr: botBorrarArr,

    // Todos los butones que da la salida del cesta;
    // Para guardal los cambios a DB (reanovar);
    botSalida: botSalida,

    // Cambiar la moneda;
    moneda: moneda,
    monedaNativa: monedaNativa,

    host: host,
};

// La funcionalodad para cambiar la moneda;
if (moneda) {
    moneda.addEventListener('change', () => {
        cesta.loader();
    });
};

// El ejemplar del cesta;
const cesta = new Cesta(paramCesta);

// El primer cargo;
cesta.loader();