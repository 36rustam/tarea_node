import { Moneda } from "./Moneda.js";
// import { CambiarMoneda } from "./Moneda.js";
export class Cesta extends Moneda {

    //Cesta item; 
    #rowArr; #rowArrCL = []; #cantidadArr; #maxCantidad = []; #precio;
    #classListRow = [];

    // Cambiar cantidad; //botSalida para guardar los cambios;
    #botonMas; #botonMasCL = []; #botonMenosCL = []; #botonMenos;

    // Calculaciones
    #subtotalArr;
    #total;

    // Avisos
    #seAcaboArr;
    #seAcaboCL = [];
    #avisoCantidadArr = [];
    #avisoCantidadCL = [];

    // Borrar sin cambios a DB; //botSalida para guardar los cambios;
    #botBorrarArr;

    //Conserva todos ld del producto que tiene borrar con pincha al bot this.#botBorrarArr;
    // formato [{id:x},{id:x2}...];
    #delParam = [];


    constructor(param) {

        super(
            param.host,
            param.monedaNativa
        );

        //Cesta item; 
        this.#rowArr = param.row;
        this.#rowArr.forEach((element, index) => {//clasList
            this.#rowArrCL[index] = element.classList;
        });
        this.#cantidadArr = param.cantidad;
        this.#precio = param.precio;

        // Cambiar cantidad; //botSalida para guardar los cambios;
        this.#botonMas = param.botonMas;
        this.#botonMas.forEach((element, index) => {//classList
            this.#botonMasCL[index] = element.classList;
        });

        this.#botonMenos = param.botonMenos;
        this.#botonMenos.forEach((element, index) => {//classList
            this.#botonMenosCL[index] = element.classList;
        });


        param.botons.forEach(element => {//evento para +/-
            element.addEventListener('click', (e) => {
                try {
                    this.#pulsarMM(e);
                }
                catch (err) {
                    console.error(err);
                }
                e.stopPropagation();
            });
        });

        // Calculaciones
        this.#subtotalArr = param.subTotal;
        this.#total = param.total;

        // Avisos
        this.#seAcaboArr = param.seAcabo;
        param.seAcabo.forEach((element, index) => {//classList
            this.#seAcaboCL[index] = element.classList;
        });
        this.#avisoCantidadArr = param.avisoCantidad;
        this.#avisoCantidadArr.forEach((element, index) => {//classList
            this.#avisoCantidadCL[index] = element.classList;
        });

        // Borrar sin cambios a DB; //botSalida para guardar los cambios;
        this.#botBorrarArr = param.botBorrarArr;
        param.botBorrarArr.forEach(element => {//evento borrar sin cambios
            element.addEventListener('click', (e) => {
                this.#borrarPreliminamente(e);
            });
        });

        // Todos los butones que da la salida del cesta;
        // Para guardal los cambios a DB (reanovar);
        param.botSalida.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.#guardarCambios(e);
                e.stopPropagation();
            });
        });

        // la moneda corriente
        this.moneda = param.moneda;

        // La cantidad maxima del cada producto; Segun DB.productos.almacen;
        this.#almasen()
    };


    loader() {

        let cestaVaciaPreliminar = true;//true ? total=0 : haz calculaciiones;

        this.#subtotalArr.forEach(async (sub, index) => {

            //Que son borados preliminarmente; Sigen existiengdo ente DB;
            const borado = (Array.from(this.#rowArrCL[index])).includes('d-none');
            if (!borado) {

                // decimos que tiene que hacer las calculaciones;
                cestaVaciaPreliminar = false;

                // Espera el precio segun la moneda elegida;
                this.#precio[index].textContent = await this.cambiarMoneda(this.#precio[index], this.moneda);
                this.#calcSubtotal(index);
                this.aDineral(this.#precio[index], this.moneda);

                //estará de acuerdo la cantidad;//areglará la apariencia segun el resultado;
                this.#cantidadArr[index].textContent = this.#cantidadActual(index);
            };
            this.#calcTotal();

            if (cestaVaciaPreliminar) {
                this.#total.textContent = 0;
            };
        });
    };

    // Evento but +/-; Define que calculacion tiene que hacer;
    #pulsarMM(event) {
        // console.log('pulsarMM esta marchando');
        const signo = event.currentTarget.dataset.but;
        // console.log(signo);//ponemos menos o ponemos más;
        if (signo !== 'mas' && signo !== 'menos') {
            throw Error(`Signo no es corecto (es posible que problema esta en
                    el ficero html data-but`);
        }
        signo === 'mas' ? this.#mas(event) : this.#menos(event);
        this.#calcTotal()
    };

    #mas(event) {
        // console.log('pulso mas');
        let index = Array.from(this.#botonMas).indexOf(event.currentTarget);
        index = this.#indexBien(index);
        const cantidad = this.#cantidadActual(index);
        this.#classList(cantidad, index, 'mas');
        this.#cantidadArr[index].textContent = cantidad + 1;
        this.#calcSubtotal(index);
    };

    #menos(event) {
        // console.log('pulso menos');
        let index = Array.from(this.#botonMenos).indexOf(event.currentTarget);
        index = this.#indexBien(index);
        const cantidad = this.#cantidadActual(index);
        if (cantidad === 0) {
            return;
        }
        this.#classList(cantidad, index, 'menos');
        this.#cantidadArr[index].textContent = cantidad - 1;
        this.#calcSubtotal(index);
    };

    // Para cada producto;
    #calcSubtotal(index) {
        const cantidad = this.#cantidadActual(index);
        const precio = this.aNumero(this.#precio[index]);
        const result = cantidad * precio.toFixed(2);
        this.#subtotalArr[index].textContent = result;
        // console.log( cantidad +'*'+ precio+'='+ result+'result');
        this.aDineral(this.#subtotalArr[index], this.moneda);
    };

    // if (deseable>disponible){
    // deseable=disponible; aviso 'PERDONA' es visible };
    // if(deseable == disponible){but+ esta desactivada};
    // if(deseable === 0){but+ esta desactivada; aviso 'no esta' es visible,
    // cantidad=false};
    #cantidadActual(index) {
        const canDisponible = this.#maxCantidad[index];
        const canDeseable = parseInt(this.#cantidadArr[index].textContent);
        let cantidad = canDeseable;
        this.#avisoCantidadCL[index].add('d-none');
        this.#botonMasCL[index].remove('cantidadZero');

        if (canDisponible == 0) {
            this.#rowArrCL[index].add('cantidadZero');
            this.#botonMasCL[index].add('cantidadZero');
            this.#seAcaboCL[index].remove('d-none');
            cantidad = false;
        } else if (canDeseable > canDisponible) {
            this.#botonMasCL[index].add('cantidadZero');
            cantidad = canDisponible;
            this.#avisoCantidadCL[index].remove('d-none');
        } else if (canDeseable == canDisponible) {
            this.#botonMasCL[index].add('cantidadZero');
        };
        // console.log(cantidad);
        if (!Number.isInteger(cantidad) && cantidad !== false) {
            console.log(cantidad);
            throw Error(`El valor del 'cantidad' no es un integer y no es false`);
        }
        return cantidad;
    };

    // Controla los clases botons +/- (diponible/indispinible);
    #classList(cantidad, index, signo = 0) {
        if (cantidad === this.#maxCantidad[index] - 1 && signo === 'mas') {
            this.#botonMasCL[index].add('cantidadZero');
        } else if (cantidad === this.#maxCantidad[index] && signo === 'menos') {
            this.#botonMasCL[index].remove('cantidadZero');
        };
        if (cantidad === 1 && signo === 'menos') {
            this.#botonMenosCL[index].add('cantidadZero');
        } else if (cantidad === 0 && signo === 'mas') {
            this.#botonMenosCL[index].remove('cantidadZero');
        };
        return;
    };

    #calcTotal() {
        let res = 0;
        this.#subtotalArr.forEach((element, index) => {
            const borado = (Array.from(this.#rowArrCL[index])).includes('d-none');
            if (!borado) {
                // console.log(element.textContent);
                const sub = this.aNumero(element);
                res += sub;
                this.#total.textContent = res;
            };
        });
        this.aDineral(this.#total, this.moneda);
    };

    //La consulta con DB.productos.almacen; Cuanto producto está;
    async #almasen() {
        this.#cantidadArr.forEach(async (element, index) => {
            const id = parseInt(element.dataset.id);
            const respuesta = await axios.get(`${this.host}/api_cesta/almacen?id=${id}`)
                .catch((error) => {
                    throw Error(error);
                });
            this.#maxCantidad[index] = respuesta.data.almacen;
        });
    };

    #borrarPreliminamente(event) {
        let index = Array.from(this.#rowArr).indexOf(event.currentTarget.parentElement);
        index = this.#indexBien(index);
        const id = parseInt(event.currentTarget.dataset.id);
        // añade al lista para borrar del DB.cestas
        this.#delParam.push({ id: id });
        //ocultamos todos los avisos;
        this.#seAcaboCL[index].add('d-none');
        this.#rowArrCL[index].add('d-none');
        this.#avisoCantidadCL[index].add('d-none');
        this.loader();//reload;
    };

    #delCesta(recargar = false) {
        // console.log('del');
        axios.delete(
            `${this.host}/api_cesta/borrar/`,
            { data: this.#delParam }
        ).catch(error => {
            console.log(error);
        });
        if (recargar) {
            console.log('loader');
            this.loader()
        };
    };
    #putCesta(putParam) {
        // console.log('put');
        axios.put(
            `${this.host}/api_cesta/cambiar`,
            putParam
        ).catch(function (error) {
            console.log(error);
        });
    };

    #guardarCambios(event) {
        const href = event.currentTarget.getAttribute('href');
        // sort para solisitut PUT y DELETE
        let putParam = [];
        // console.log(event.currentTarget.getAttribute('href'));
        this.#cantidadArr.forEach(element => {
            const id = parseInt(element.dataset.id);
            const cantidad = parseInt(element.textContent)
            if (cantidad === 0) {
                this.#delParam.push({ id: id });
            } else if(!cantidad===false) {
                putParam.push({
                    id: id,
                    cantidad: cantidad,
                });
            };
        });


        if (!this.esEmpty(this.#delParam)) {
            this.#delCesta();
        };
        if (!this.esEmpty(putParam)) {
            this.#putCesta(putParam);
        };
        window.location.href = href;//Al destino;
    };

    #indexBien(index) {
        if (!Number.isInteger(index)) {
            throw Error('Index no es un numero entero');
        } else if (index < 0) {
            throw Error('Index es menor que 0. Tal vez no está este elemento en array');
        } else {
            return index;
        };
    };
};