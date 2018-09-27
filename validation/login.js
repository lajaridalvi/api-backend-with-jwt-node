const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =  function validatelogin(data){
    let error= {};
    data.email =  !isEmpty(data.email)? data.email:""; 
    data.password =  !isEmpty(data.password)? data.password:"";
   
   
    if(validator.isEmpty(data.email)){
        error.email ="email is required"
    }
    if(validator.isEmpty(data.password)){
        error.password ="password is required"
    }
        return {
        error,
        isvalid :isEmpty(error)
    }   
}