const { Router } = require('express');
const router = Router();
const ProductosGet = require('../db/ProductosGet.js');
const Cesta = require('../db/Cesta.js');

router.get(
    '/',
    (req, res) => {
        // console.log(req.query.id_producto);
        const producto = new ProductosGet();
        producto.getElProducto(req.query.id_producto)
            .then(result => {
                // console.log(result);
                res.render(
                    'compra',
                    {
                        title: 'comprar ' + req.query.id_producto,
                        producto: result[0]
                    }
                )
            })
            .catch(err => {
                throw err;
            })
    }
);

router.get(
    '/cesta',
    (req, res) => {
        const idUsuario = req.session.usuarioId;
        const idProducto = req.query.id_producto;
        let cantidad = 1;
        const cesta = new Cesta();
        cesta.addProducto(idProducto, idUsuario, cantidad)
            .then(result => {
                // console.log(result);
                req.session.aviso='ya en cesta';
                res.redirect('/productos');
            })
            .catch(err => {
                console.error(err);
            })
    }
);

module.exports = router;