import { Dineral } from "./Dineral.js";

export class Moneda extends Dineral {
    constructor(rutaPrecioReal, monedaNativa) {
        super();
        this.rutaPrecioReal = rutaPrecioReal;
        this.monedaNativa = monedaNativa;
    };

    async cambiarMoneda(precio, moneda) {
        const id = precio.dataset.id;
        moneda = moneda.value;
        let precioReal;
        precioReal = await axios.get(`${this.rutaPrecioReal}/precio_real?id=${id}`).catch(err => {
            console.error(err);
        });
        precioReal = precioReal.data;
        if (moneda === this.monedaNativa) {
            return precioReal;
        } else {
            // let moneda='EUR';
            let precioMoneda;
            precioMoneda = await axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange
            // ?valcode=${moneda}&date=20200302&json`).catch(error => {
                console.log(error.cause)
            });
            precioMoneda = precioMoneda.data[0].rate;
            const result = precioReal / precioMoneda;
            // console.log('cambio' + result);
            return result.toFixed(2);
        };
    };
};