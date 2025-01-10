const {Router}=require('express');
const router=Router();

const controllerUser=require('../middleware/controllerUser.js');


router.get(
    '/',
    // controllerUser
    controllerUser,
    (req, res)=>{
        res.render(
            'user_zona',
            {
                esUserZona:true,
                title:'zona user',
            }
        );
    }
);

module.exports=router;