require('dotenv').config();
const mysql = require('mysql2');
const empty = require('is-empty');

class LoginDB {
    constructor() {
        this.connect = mysql.connect(
            {
                host: process.env.HOST,
                user: process.env.USER,
                database: process.env.DATABASE,
                password: process.env.PASSWORD
            }
        );
        this.connect.connect(
            err => {
                if (err) throw err;
                console.log('db login es conectada');
            }
        );
    };

    // email esta?
    emailEsta(email) {
        const datos = Array(email);
        return new Promise(
            (resolve, reject) => {
                const sql = 'SELECT email FROM usuarios WHERE email=?';
                this.connect.execute(
                    sql,
                    datos,
                    (err, result, fields) => {
                        // console.log('result es empty?=>' + empty(result) + ' ' + 'DIR:' + __dirname);
                        // si está el error
                        err ? reject(err) : resolve(
                            // esta email?
                            // en el caso si el result es empty(true)=>email no esta(return falsse)
                            empty(result) ? false : true
                            // empty(result)?result:result[0].email
                        );
                    }
                );
            }
        );
    };

    // registrarse
    registro(datos) {
        // console.log(typeof datos);
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO usuarios(email, contrasena) VALUES(?,?);';
            this.connect.execute(
                sql,
                datos,
                (err, result) => {
                    err ? reject(err) : resolve();
                    // if (err) throw err;
                    // return result;
                }
            );
        });

    };

    // devuelve el id del user por email
    usuarioId(email) {
        const datos = [email];
        return new Promise((resolve, rejects) => {
            const sql = 'SELECT id FROM usuarios WHERE email=?';
            this.connect.execute(
                sql,
                datos,
                (err, result, fields) => {
                    err?rejects(err):resolve(result);
                }
            );
        });
    };

    // devuelve rol del usuario por su id
    getRol(id){
        const datos = [id];
        const sql='SELECT rol FROM usuarios WHERE id=?;';
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
module.exports = LoginDB;