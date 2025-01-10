const { Router } = require('express');
const router = Router();
const controllerAdmin = require('../middleware/controllerAdmin.js');

router.get(
    '/fetch',
    (req, res) => {
        const datos = 'esta es la respuesta de la página';
        const bDatos = Buffer.from(datos);
        res.send(datos);
    }
);

router.post(
    '/fetch',
    (req, res) => {
        let datos = res.req._readableState.buffer.toString();
        datos = JSON.parse(datos);

        const signo = req.query.signo;
        const primero = Number(datos.primero);
        const segundo = Number(datos.segundo);

        const result =
            signo === 'mas'
                ? primero + segundo
                : primero - segundo;
        console.log(result);
        res.send(`la respuesta del servidor es: ${result}`);
    }
);

router.get(
    '/',
    // controllerAdmin,
    (req, res) => {
        res.render(
            'test_axios',
            {
                title: 'test axios',
                esTestAxios: true,
                esAdmin: res.locals.esAdmin,
            }
        );
    }
);



module.exports = router;