const { Router } = require('express');

const router = Router();

const LoginDB = require('../db/LoginDB.js');



router.get(
    '/',
    (req, res) => {
        res.render(
            'login',
            {
                esLogin: true,
                subAut: true,
            }
        );
    }
);

// post registrarse
router.post(
    '/registrarse',
    (req, res) => {
        // console.log(req.body);
        const email = req.body.email;
        // console.log('email router_login '+email);

        const registro = new LoginDB();
        registro.emailEsta(email)
            .then(result => {
                // email está?==>está ocupado
                console.log('result promise:(email esta?) ' + result);
                if (result) {
                    res.render(
                        'login',
                        {
                            esLogin: true,
                            avisoReg: 'este email ya es ocupado',
                            emailReg: req.body.email,
                            subReg: true,
                        }
                    )
                } else {
                    // email está?=>está libre
                    // console.log('session :  ' + req.session);
                    // en el caso si el email es libre
                    const datos = [req.body.email, req.body.contrasena];
                    registro.registro(datos)
                        .then(() => {
                            req.session.autorizado = true;
                            req.session.save(
                                err => {
                                    if (err) { throw err };
                                    res.redirect('/');
                                }
                            );
                        });
                };
            })
            .catch(err => {
                throw err;
            })

    }
);

// autorizarse POST
router.post(
    '/autorizarse',
    async (req, res) => {
        const email = req.body.email;
        const autorizar = new LoginDB();
        autorizar.emailEsta(email)
            .then(result => {
                console.log('result promise: (email esta?)==>' + result + ` ${__dirname}`);
                if (!result) {

                    res.render(
                        'login',
                        {
                            esLogin: true,
                            avisoAut: 'no tenemos el usuario con este email',
                            emailAut: req.body.email,
                            subAut: true,
                        }
                    );
                } else {
                    // express-session (consegimos la session)
                    req.session.autorizado = true;
                    // promise db
                    autorizar.usuarioId(email)
                        .then((result) => {
                            // console.log('id del usuario es ' + JSON.stringify(result));
                            req.session.usuarioId = result[0].id;
                            return result[0].id;
                        })
                        .then((id) => {
                            // console.log('id user: '+req.session.usuarioId);
                            return autorizar.getRol(id)
                        })
                        .then(result => {
                            // console.log('fija te :  ' + JSON.stringify(result));
                            req.session.rol = result[0].rol;
                            // return req.session;
                            // console.log('req.session.rol ' + req.session.rol);
                        })
                        .then(() => {
                            // esperara la gvardacción los todos datos
                            req.session.save(
                                err => {
                                    if (err) { throw err };
                                    res.redirect('/');
                                }
                            );
                        })
                        .catch(err => {
                            throw err;
                        });



                };
            })
    }
);

router.get(
    '/salir',
    async (req, res) => {
        // destroy la session y callback
        req.session.destroy(
            () => {
                res.redirect('/login');
            }
        );
    }
);
module.exports = router;