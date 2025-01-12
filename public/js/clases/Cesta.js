import { Moneda } from "./Moneda.js";
// import { CambiarMoneda } from "./Moneda.js";
export class Cesta extends Moneda {
    #botonMas;
    #botonMenos;

    #rowArr;
    #precio;
    #cantidadArr;
    #subtotalArr;
    #total;

    constructor(param) {
        super(
            param.rutaPrecioReal,
            param.monedaNativa
        );
        this.#rowArr = param.row;
        this.#precio = param.precio;
        this.#cantidadArr = param.cantidad;
        this.#subtotalArr = param.subTotal;
        this.#total = param.total;
        this.#botonMas = param.botonMas;
        this.#botonMenos = param.botonMenos;
        this.moneda = param.moneda;
    };

    // pulsar 
    pulsarMM(event) {
        // console.log('pulsarMM esta marchando');

        const index = Array.from(this.#rowArr).indexOf(event.currentTarget.parentElement.parentElement);
        // console.log(`event index: ${index}`);
        if (!Number.isInteger(index)) throw Error('Index no es un numero entero');

        const signo = event.currentTarget.dataset.but;
        // console.log(signo);//ponemos menos o ponemos más;
        if (signo !== 'mas' && signo !== 'menos') {
            throw Error(`Signo no es corecto (es posible que problema esta en
                el ficero html data-but`);
        }
        signo === 'mas' ? this.#mas(index, event) : this.#menos(index, event);
        this.#calcSubtotal(index);
        this.#calcTotal()
    };

    loader() {
        this.#subtotalArr.forEach(async (sub, index) => {
            this.#precio[index].textContent = await this.cambiarMoneda(this.#precio[index], this.moneda);
            this.#precio[index].textContent = this.#precio[index].textContent;
            this.#calcSubtotal(index);
            this.aDineral(this.#precio[index], this.moneda);
            this.#calcTotal();
        });
    };

    #mas(index, event) {
        // console.log('pulso mas');
        const cantidad = this.#cantidadActual(index);
        this.#classList(cantidad, index, event, 'mas');
        this.#cantidadArr[index].textContent = cantidad + 1;
    };

    #menos(index, event) {
        // console.log('pulso menos');
        const cantidad = this.#cantidadActual(index);
        if (cantidad === 0) {
            return;
        }
        this.#classList(cantidad, index, event, 'menos');
        this.#cantidadArr[index].textContent = cantidad - 1;
    };

    #cantidadActual(index, event, operand) {
        const cantidad = parseInt(this.#cantidadArr[index].textContent);
        // console.log(cantidad);
        if (!Number.isInteger(cantidad))
            throw Error(`El valor del 'cantidad' no e sun integer`);
        return cantidad;
    };

    #classList(cantidad, index, event, signo) {
        const classList = this.#botonMenos[index].classList;
        // console.log(Array.from(classList).includes('cantidadZero'));
        if (cantidad > 1) {
            return;
        } else if (cantidad === 1 && signo === 'menos') {
            classList.add('cantidadZero'); return;
        } else if (cantidad === 0 && signo === 'mas') {
            classList.remove('cantidadZero'); return;
        };
    };

    #calcSubtotal(index) {
        const cantidad = this.#cantidadActual(index);
        // console.log(cantidad);
        const precio = this.aNumero(this.#precio[index]);
        // console.log(precio);
        // console.log(precio);
        // console.log(precio.toString().replace('.',''));
        // console.log((precio * 100) % 1);
        // if (precio * 100 % 1 !== 0) {
        //     throw Error(`El precio no es valido: ${precio}`);
        // };
        const result = cantidad * precio.toFixed(2);
        this.#subtotalArr[index].textContent = result;
        // console.log( cantidad +'*'+ precio+'='+ result+'result');
        this.aDineral(this.#subtotalArr[index], this.moneda);
    };

    #calcTotal() {
        let res = 0;
        this.#subtotalArr.forEach(element => {
            // console.log(element.textContent);
            const sub = this.aNumero(element);
            res += sub;
            this.#total.textContent = res;
        });
        this.aDineral(this.#total, this.moneda);
    };

};