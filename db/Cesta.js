const mysql = require('mysql2');

class Cesta {
    constructor() {
        this.connect = mysql.connect({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        });
        this.connect.connect(err => {
            err ? console.err(err) : console.log('db cesta está conectadas');
        });
    };

    // ver todos los productos del cesta
    getCesta(idUsuario) {
        const datos = [idUsuario];
        const sql = 'SELECT * FROM cestas WHERE usuario=? ORDER BY producto;';
        return new Promise((resolve, rejects) => {
            this.connect.execute(
                sql,
                datos,
                (err, result, fields) => {
                    err ? rejects(err) : resolve(result);
                }
            );
        });
    };

    // añadir el producto al cesta
    addProducto(idProducto, idUsuario, cantidad = 1) {
        // console.log(idUsuario + '_' + idProducto);
        const datos = [idUsuario + '_' + idProducto, idProducto, idUsuario, cantidad]
        const sql = 'INSERT INTO cestas(id,producto, usuario, cantidad) VALUES(?,?,?,?);';
        return new Promise((resolve, rejects) => {
            this.connect.execute(
                sql,
                datos,
                (err, result, fields) => {
                    if (err) {
                        // console.log('code' + err.code);
                        if (err.code === 'ER_DUP_ENTRY') {
                            resolve(this.addCantidad(idProducto, idUsuario, cantidad));
                        } else {
                            rejects(err);
                        }
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    };
    // Añadir +cantidad al cesta 
    // (en el caso si el producto dado ya esta en cesta);
    addCantidad(idProducto, idUsuario, cantidad = 1) {
        const sql = 'UPDATE cestas SET cantidad=cantidad+? WHERE id=?;';
        const datos = [cantidad, idUsuario + '_' + idProducto];
        return new Promise((resolve, rejects) => {
            this.connect.execute(
                sql,
                datos,
                (err, results, fields) => {
                    err ? rejects(err) : resolve(results);
                }
            );
        });
    };
    async updateCantidad(cantidad, idUsuario, idProducto){
        const sql='UPDATE cestas SET cantidad=? WHERE usuario=? AND producto=?';
        const datos =[cantidad, idUsuario, idProducto];
        await this.connect.execute(
            sql,
            datos,
            (err,result, fields)=>{
                if(err){
                    console.log(err);
                }else{
                    return result;
                };
            }
        );
    };
    async deleteDelCesta(idProducto, idUsuario){
        const sql= 'DELETe FROM cestas WHERE producto=? AND usuario=?;';
        const datos=[idProducto, idUsuario];
        await this.connect.execute(
            sql,
            datos,
            (err, result, fields)=>{
                if(err){
                    throw err;
                }else{
                    return result;
                };
            }
        );
    };

};

module.exports = Cesta;