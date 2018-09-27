const express =  require('express')
const router =  express.Router();
// const validateloginUser = require('../validation/addProduct')


const Schema = require('../schema/Login');

router.get('/testlogin',(req , res) => {
    return res.json({
        msg:"your test connection done successfully"
    })
})

router.post('/loginuser',(req,res)=>{
    // const {error, isvalid} = validateloginUser(rrq.body);

    if(req.body.email === undefined || req.body.email === null || req.body.password === undefined || req.body.password === null){
       res.json({
           status:false,
           message:'enter email and password not correct' 
        })
        return
    }
    const login  = new Schema ({

        email : req.body.email,
        password : req.body.password
    })
    login
    .save()
    .then(login => res.json(login))
    .catch(err => console.log(err));
    // .then(res.status(200).json({msg:"Done login "}))
    
})

module.exports = router;