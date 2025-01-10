module.exports= function (req,res,next){
    res.locals.esUsuario=req.session.autorizado;
    res.locals.usuarioId=req.session.usuarioId;
    res.locals.rol=req.session.rol;

    // para hbs; en el caso si es un administrador; 
    if(req.session.rol=='admin'){
        res.locals.esAdmin=true;
    }

    console.log('locals '+ JSON.stringify(res.locals));

    next();
};