const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateAddProduct(data){
    let error = {};
    data.Name = !isEmpty(data.Name) ? data.Name: "";
    data.Price = !isEmpty(data.Price) ? data.Price: "";
    data.Quantity = !isEmpty(data.Quantity) ? data.Quantity: "";
    data.Description = !isEmpty(data.Description) ? data.Description: "";

    if(!validator.isLength(data.Name,{min: 3, max: 20})){
        error.Name = "Product name should be at least 3 characters.."

    }
    if(validator.isEmpty(data.Name)){ 
        error.Name = "Product name is required.."

    }
    if(validator.isEmpty(data.Price)){
        error.Price = "Product Price is required.."

    }
    if(validator.isEmpty(data.Quantity)){
        error.Quantity = "Product Quantity is required.."

    }
    if(validator.isEmpty(data.Description)){
        error.Description = "Product Description is required.."

    }
    return {
        error,
        isvalid :isEmpty(error)
    }   

}