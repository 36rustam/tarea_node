const { Router } = require('express');
const router = Router();
const Producto = require('../../db/ProductosGet.js');
const Cesta = require('../../db/Cesta.js');

const controllerUser = require('../../middleware/controllerUser.js');

router.get(
    `/almacen`,
    controllerUser,
    async (req, res) => {
        const idProducto = req.query.id;
        const almacen = new Producto();
        const result = await almacen.almacen(idProducto);
        res.send(result[0]);
    }
);

router.get(
    '/precio',
    controllerUser,
    async (req, res) => {
        // console.log(req.query);
        const id = req.query.id;
        let precio = new Producto();
        precio = await precio.getElProducto(id);
        precio = precio[0].precio;
        res.send(precio);
    }
);

router.put(
    '/cambiar',
    controllerUser,
    async (req, res) => {
        // console.log(req.body);
        const productos = req.body;
        const cesta = new Cesta();
        const idUsuario = req.session.usuarioId;
        await productos.forEach(element => {
            idProduct = element.id;
            cantidad = element.cantidad;
            cesta.updateCantidad(cantidad, idUsuario, idProduct);//update al db
        });
    }
);

router.delete(
    '/borrar',
    controllerUser,
    async (req, res) => {
        // console.log(JSON.stringify(req.body));
        const productos = req.body;
        // console.log(productos);
        const idUsuario = req.session.usuarioId;
        const cesta = new Cesta();
        await productos.forEach(element => {
            const idProduct = element.id;
            // console.log(idProduct);
            cesta.deleteDelCesta(idProduct, idUsuario);
        });
    }
);

// router.get(
//     '/get',
//     controllerUser,
//     async (req, res) => {
//         const cesta = new Cesta();
//         const result=await cesta.getCesta(req.session.usuarioId);

//         const producto = new Producto();
//         // array para hacer las pronisas iretablen
//         const p = [];
//         result.forEach((item, index) => {
//             // creamos una seria de las promisas
//             p[index] = new Promise((resolve, rejects) => {
//                 producto.getElProducto(item.producto)
//                     .then(resultItem => {
//                         result[index].producto = resultItem[0];
//                         resolve(result);
//                     })
//             })
//             .then(result=>{
//                 res.send(result);
//             })
//             .catch(err=>{
//                 console.log(err);
//             });
//         });
//     }
// );
module.exports = router;