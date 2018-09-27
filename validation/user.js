const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =  function validateadduser(data){
    let error= {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName: "";
    data.lastName =  !isEmpty(data.lastName) ? data.lastName:"";
    data.email =  !isEmpty(data.email)? data.email:""; 
    data.password =  !isEmpty(data.password)? data.password:"";
    data.cpassword =  !isEmpty(data.cpassword) ? data.cpassword:'';
    data.address =  !isEmpty(data.address) ? data.address:"";

    if(!validator.isLength(data.firstName,{min:2 , max : 15})){
        error.firstName =" you have to enter minimum 2 character in firstName"  
    }
    if(!validator.isLength(data.lastName , { min:2 , max: 15})){
        error.lastName="you have to enter minimum 2 character in lastname"
    }
    if(validator.isEmpty(data.firstName)){
        error.firstName ="first name is required"
    }
    if(validator.isEmpty(data.lastName)){
        error.lastName ="last name is required"
    }
    if(validator.isEmpty(data.address)){
        error.address ="Address is required"
    }
    if(validator.isEmpty(data.email)){
        error.email ="email is required"
    }
    if(validator.isEmpty(data.password)){
        error.password ="password is required"
    }
    if(validator.isEmpty(data.cpassword)){
        error.cpassword ="conform password is required"
    }
    if(data.password != data.cpassword){
    error.cpassword = "password and cpassword doesn't match"
    }
    if(validator.isEmpty(data.address)){
        error.address ="address is required"
    }
    return {
        error,
        isvalid :isEmpty(error)
    }   
}