const express =  require('express');
const router = express.Router();
const Schema = require('../schema/User');
const validateadduser = require('../validation/user')
const validatelogin = require('../validation/login')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");



//to add user(to register)
router.post('/adduser',(req,res)=>{

    const{error, isvalid} = validateadduser(req.body);
    
    if(!isvalid){
        return res.status(400).json(error);
    } else{
            Schema.findOne({email: req.body.email}).then(user=>{
                if(user) {
         res.json({meg:"this email id already exit"})
                }
        //  .catch(error => console.log(error))

  else{
    const adduser =  new Schema({
        email:req.body.email,
        password:req.body.password,
        cpassword:req.body.cpassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address

    })
    //here we bcrypt the password and 55 is the saltfactor here
    bcrypt.genSalt(5, (err,salt)=>{
        bcrypt.hash(adduser.password,salt,(err,hash)=>{
            if(err)throw err;
            adduser.password = hash;
            
            adduser
            .save()
            .then(adduser=> res.json(adduser))
            .catch(err=> console.log(err))
        })
    })
    
}
})
}
})

//to find all user 
router.get('/getallusers',(req,res)=>{
    Schema.find().select( "firstName lastName email password cpassword address").then(user=>{
        return res.status(200).json(user)
        if(!user){
            res.json({msg:"no user found in this collection"})
        }
    })
})

// find by id wheather user is available or not
router.get('/getuserbyId/:userId', (req,res)=>{
    Schema.findById(req.params.userId)
    .then(user =>  
        {
            if(user)
            res.json(user)
            else
            res.json('no user found with this usIid')
        })
        .catch(err => console.log(err));
})

//find by email id
router.get('/getuseremail/:email', (req,res)=>{
    Schema.findOne({email: req.params.email})
    .then(user=>{
        if(user)
                    res.json(user)
                    else
                    res.json('no user found with this email id')
                })
                .catch(err => console.log(err));
})

//to edit added user 
router.post('/edituser/:email',(req, res)=>{
   
    const updateUser = {
        email:req.body.email,
        password:req.body.password,
        cpassword:req.body.cpassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address
        
    }
    Schema.findOneAndUpdate({email:req.params.email},{$set: updateUser}, {new: true}).then(user => {
        if(user){
        res.json({msg:"updated", user})
    }else{
        res.json({msg:"thee is no user to update"})
    }
       
    })

})
//to delete single user
router.post('/deleteuser/:email',(req,res)=>{
    Schema.findOneAndRemove({email:req.params.email}).then(user=>{
       if(user){
           res.json({msg:"user deleted",user})
       }else{
           res.json({msg:"there is no user to delete."})
       }
       
        
    })
})


//to login user 
router.post('/login',(req,res)=>{
    const{error, isvalid} = validatelogin(req.body);
    
    if(!isvalid){
        return res.status(400).json(error);
    } else{

    Schema.findOne({email: req.body.email})
    .then(user=>{
        if(user) 
            //to check password
            bcrypt.compare(req.body.password, user.password).then(isMatch=>{
                if(isMatch)
                {
                    //create a payload variable
                    const payload={
                        id: user.id,
                        email:user.email,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        address:user.address

                    }
                    //sign payload
                    jwt.sign(payload,keys.secretOrKey,{expiresIn:36000}, (err,token)=>{
                        res.json({ status: true, token: "Bearer " + token });
                    })

                }else{
                    return res.status(400).json({ msg: "Password missmatched" });
                
            }
        })
        else
        res.json({msg:"enter correct email id and password"})
    })
    .catch(err => console.log(err));
}
            // .catch(err => console.log(err));
})


//to check authetication
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({
          id: req.user.id,
        email:req.user.email,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        address:req.user.address
      });
    }
  );


module.exports = router;