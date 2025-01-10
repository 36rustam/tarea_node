const {Router}=require('express');
const router=Router();

router.get(
    '/',
    (req,res)=>{
        res.render(
            '404',
            {
                title:'no está',
            }
        );
    }
);

module.exports=router;