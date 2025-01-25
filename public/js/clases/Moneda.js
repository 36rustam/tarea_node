import { Dineral } from "./Dineral.js";

export class Moneda extends Dineral {
    constructor(host, monedaNativa) {
        super();
        this.host = host;
        this.monedaNativa = monedaNativa;
    };

    // Segun el curso actual del banco de Ucrania;
    async cambiarMoneda(precio, moneda) {
        const id = precio.dataset.id;
        let precioReal;
        //Espera el precio actual en moneda nativa del DB;
        precioReal = await axios.get(`${this.host}/api_cesta/precio?id=${id}`).catch(err => {
            console.error(err);
        });
        precioReal = precioReal.data.toFixed(2);
        //Hace cambios;
        if (moneda.value === this.monedaNativa) {
            return precioReal;
        } else {
            let precioMoneda;
            let data = new Date().toLocaleDateString('en-CA').replaceAll('-', '');
            // Estamos esperando el precio de la moneda en relación al precio de la moneda nativa;
            precioMoneda = await axios.get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange
            // ?valcode=${moneda.value}&date=${data}&json`).catch(error => {
                moneda.value = this.monedaNativa;
                const monedaCL = moneda.classList;
                monedaCL.add('bg-danger');
                throw Error(error)
            });
            precioMoneda = precioMoneda.data[0].rate;
            const result = precioReal / precioMoneda;
            // console.log('cambio' + result);
            return (result.toFixed(2));
        };
    };
};