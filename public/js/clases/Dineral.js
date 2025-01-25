export class Dineral {
    esEmpty = val => val ? val === null || !(Object.keys(val) || val).length : true;

    // // Format precio (300.23==>300,23 грн);
    aDineral(cajaPrecio, moneda) {
        let bsp47;//segun BCP 47 language tags;
        const monedaDada = moneda.value;
        // console.log(monedaDada);
        switch (monedaDada) {
            case "UAH":
                bsp47 = 'uk-UA'; break;
            case "EUR":
                bsp47 = 'es-ES'; break;
            case 'USD':
                bsp47 = 'en-US'; break;
            default:
                throw Error('La moneda desconocida');
        };

        cajaPrecio.textContent = Intl.NumberFormat(
            bsp47,
            {
                currency: monedaDada,
                style: 'currency',
            }
        ).format(cajaPrecio.textContent);
    };

    // (300,23 грн==>300.23)
    aNumero(element) {
        // console.log(element.textContent);
        let preparado;
        preparado = element.textContent.replace(/\D/g, '');
        preparado=preparado.slice(0,-2)+'.'+preparado.slice(-2);
        // console.log(preparado);
        const stringFormatado = parseFloat(preparado).toFixed(2);
        return Number(stringFormatado);
    };

    esEmpty(val) {
        return this.esEmpty(val);
    };
};