const { Router } = require('express');
const router = Router();

//db
const productosAdmin = require('../db/ProductosAdminDb.js')

// controller
const controllerAdmin = require('../middleware/controllerAdmin.js');
const ProductosAdminDb = require('../db/ProductosAdminDb.js');
// const { default: axios } = require('axios');

router.get(
    '/',
    controllerAdmin,
    (req, res) => {
        res.render(
            'admin_zona',
            {
                title: 'admin zona',
                esAdminZona: true,
            }
        );
    }
);

router.post(
    '/anadir_producto',
    controllerAdmin,
    (req, res) => {
        const Productos = new ProductosAdminDb();
        Productos.addProducto(
            req.body.nombre,
            req.body.precio,
            req.body.ruta_img
        )
            .then(result => {
                if (result.affectedRows === 1) {
                    res.render(
                        'admin_zona',
                        {
                            title: 'admin zona',
                            aviso: 'he añadido',
                        }
                    )
                }
                // console.log('result ' +JSON.stringify(result));
            })
            .catch(err => {
                // throw err;
                res.render(
                    'admin_zona',
                    {
                        title: 'admin zona',
                        aviso: err,
                    }
                );
            })
    }
);

module.exports = router;