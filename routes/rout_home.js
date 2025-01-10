const {Router} =require('express');
// const dblog=require('../db/LoginDB.js');
const router = Router();

router.get(
    '/',
    (req,res)=>{
        // const x = new dblog();
        res.render(
            'index',
            {
                title:'home',
                esHome:true,
            }
        );
    }
);

module.exports=router;