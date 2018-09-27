const express = require ('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
// const product = require('./routes/product');
// const login  = require('./routes/Login');
const user = require('./routes/user')
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("./config/keys");//here we store the secret key which is used for jwt 
const passport = require("passport");
const app = express();

//db config 
const db = require("./config/keys").mongoURI

//mongoose connection 
 
mongoose.connect(db)
.then(() => console.log("Mongo Database connection done"))
.catch(error => console.log(error));

//middelware of passport
app.use(passport.initialize());
require("./config/passport")(passport);

//body parsr middleware

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//to use routes

// app.use('/product',product)
// app.use('/login',login)
app.use('/user',user)




const port = process.env.PORT || 1001;
app.listen(port, ()=>console.log(`server is running on port ${port}`))