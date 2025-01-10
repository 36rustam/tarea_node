const { Router } = require('express');
const router = Router();
const Cesta = require('../db/Cesta.js');
const Producto = require('../db/ProductosGet.js');
// controler
const controlerUsuario=require('../middleware/controllerUser.js');


router.get(
    '/',
    controlerUsuario,
    (req, res) => {
        const cesta = new Cesta();
        cesta.getCesta(req.session.usuarioId)
    
            .then(result => {

                const producto = new Producto();
                // array para hacer las pronisas iretablen
                const p = [];
                result.forEach((item, index) => {
                    // creamos una seria de las promisas
                    p[index] = new Promise((resolve, rejects) => {
                        producto.getElProducto(item.producto)
                            .then(resultItem => {
                                result[index].producto = resultItem[0];
                                resolve(result);
                            })
                    })
                });
                
                // esperamos a todas promisas
                Promise.all(p).then(result2 => {
                    // console.log(JSON.stringify(result2));
                    res.render(
                        'cesta',
                        {
                            title: 'cesta',
                            cesta: result,
                            esCesta:true,
                        }
                    )
                })
            })
            .catch(err => {
                err ? console.error(err) : 0
            })
    }
);

module.exports = router;