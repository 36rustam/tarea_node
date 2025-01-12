const {Router}=require('express');
const router=Router();

const Producto=require('../../db/ProductosGet.js');



router.get(
    '/',
    async (req,res)=>{
        console.log(req.query);
        const id=req.query.id;
        let precio=new Producto();
        precio=await precio.getElProducto(id);
        precio=precio[0].precio;
        res.send(precio);
    }
)


module.exports=router;