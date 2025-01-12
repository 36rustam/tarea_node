console.log('helpers.js dice hola');

// Format precio (300.23==>300,23 грн);
function formatPrecio(item) {
    item.textContent = Intl.NumberFormat(
        'uk-UA',
        {
            currency: 'UAH',
            style: 'currency',
        }
    ).format(item.textContent);
};

// Botones que cambien la cantidad (+/- 1);
function masCan(element, eventItem) {
    // console.log(eventItem.target.parentElement.children[0].classList);
    // const classLi=eventItem.target.parentElement.children[0].classList;
    // classLi.remove('cantidadZero')
    // element.parentElement.children[1].innerHTML = parseInt(element.parentElement.children[1].innerHTML) + 1;
};
function menosCan(element, cantidad, eventItem) {
    if(cantidad==1){
        // console.log(eventItem.target.classList);
        // const classLi = eventItem.target.classList;
        // classLi.add('cantidadZero')
    };
    if(cantidad!==0) {
        // element.parentElement.children[1].innerHTML = parseInt(element.parentElement.children[1].innerHTML) - 1;
    }
};


// Suma total para pagar;
function total(row, subTotal2, cajaTotal) {
    let sumaTotlal = 0;
    subTotal2.forEach((element, index) => {
        // console.log(subTotal2.childNodes);
        let subTotal = hToFloat(element.textContent);
        sumaTotlal += subTotal;
    });
    cajaTotal.innerHTML = sumaTotlal;
    formatPrecio(cajaTotal);
    // formatPrecio(row.children[3].children[0].childNodes[0]);
};

// Helper string a decimal;
function hToFloat(toFloat) {
    // Quitamos los espacios blancos y
    // reemplazamos las comas con el punto;
    // console.log(toFloat);
    let preparado = toFloat.replaceAll(' ', '').replace(/[,]+/g, '.').replace(/\s+/g, '').replaceAll('&nbsp;', '.');
    // console.log(preparado);
    let stringFormatado = parseFloat(preparado).toFixed(2);
    return Number(stringFormatado);
};

// Cambie los calculos;
function cambiaCalculos(row, subTotal2, cajaTotal2) {
    let precio = row.children[3].children[0].childNodes[0].nodeValue;
    // A float de la forma dineral;
    precio = hToFloat(row.children[3].children[0].childNodes[0].nodeValue);
    let cantidad = row.childNodes[5].children[1].innerHTML;
    // Id del elelemento;
    let subTotalId = row.childNodes[9].childNodes[1].attributes[1].nodeValue
    // console.log(precio + '*' + cantidad + '=' + subTotal);
    let subTotal = precio * cantidad;
    $('#' + subTotalId).text(subTotal);
    total(row, subTotal2, cajaTotal2);
    formatPrecio(document.getElementById(subTotalId));
};




export { formatPrecio, masCan, menosCan, total, hToFloat, cambiaCalculos };