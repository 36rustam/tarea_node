require('dotenv').config();
const mysql=require('mysql2');
const empty = require('is-empty');

class ProductosAdminDb{
    constructor(){
        this.connect=mysql.connect(
            {
                host:process.env.HOST,
                user:process.env.USER,
                database:process.env.DATABASE,
                password:process.env.PASSWORD,
            }
        );
        this.connect.connect(
            err=>{
                if(err)throw err;
                console.log('db admin productos es conectada');
            }
        );
    };


    // add producto
    addProducto(nombre, precio, rutaImagen){
        const datos=[nombre, precio, rutaImagen];
        return new Promise((resolve,rejects)=>{
            const sql='INSERT INTO productos(nombre,precio, ruta_img) values(?,?,?);';
            this.connect.execute(
                sql,
                datos,
                (err,result, fields)=>{
                    console.log(result);
                    err?rejects(err):resolve(result);
                }
            );
        });
    };
};


module.exports=ProductosAdminDb;