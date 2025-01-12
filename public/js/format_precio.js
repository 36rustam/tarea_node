import { formatPrecio } from "./helpers/helpers.js";
console.log('format_precio.js dice hola');

// Formatamos todo lo que esta relacianado con el dinero;
const cardPrecio = $('.card-precio');
cardPrecio.each(index => {
    if (index % 2 !== 0) {
        formatPrecio(cardPrecio[index]);
    }
});