require('dotenv').config();
const mysql=require('mysql2');

class Productos{
    constructor(){
        this.connect=mysql.connect({
            host:process.env.HOST,
            user:process.env.USER,
            database:process.env.DATABASE,
            password:process.env.PASSWORD,
        });
        this.connect.connect(
            err=>{
                if(err)throw err;
            }
        );
    };

    // get todos
    getProductos(){
        const sql='SELECT * FROM productos;';
        return new Promise((resolve,rejects)=>{
            this.connect.execute(
                sql,
                (err,result,fields)=>{
                    err?rejects(err):resolve(result);
                }
            );
        });
    };

    // get el producto para la compra
    getElProducto(id){
        const sql='SELECT * FROM productos WHERE id=?;';
        const datos=[id];
        return new Promise((resolve, rejects)=>{
            this.connect.execute(
                sql,
                datos,
                (err, result, fields)=>{
                    err?rejects(err):resolve(result);
                }
            );
        });
    };
};


module.exports=Productos;