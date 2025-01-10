const {Router}=require('express');
const router=Router();
// db
const Productos=require('../db/ProductosGet.js');

router.get(
    '/',
    (req,res)=>{
        
        const productos=new Productos();
        productos.getProductos()
        .then(result=>{
            // console.log(JSON.stringify(result));
            res.render(
                `productos`,
                {
                    title:'productos',
                    esProductos:true,
                    productos:result,
                    aviso:req.session.aviso?req.session.aviso:false,
                }
            );
            req.session.aviso=false;
        })
        .catch(err=>{
            res.render(
                `productos`,
                {
                    title:'productos',
                    esProductos:true,
                    err:err
                }
            );
        })
    
    }
);

module.exports=router;