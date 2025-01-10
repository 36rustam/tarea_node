//      En el caso si en la session no está escrito que el ususario es autorizado-
// redirect  a la pagina 
module.exports=function (req,res,next){
    req.session.autorizado?next(): res.redirect('/has_perdido_o_que');
};