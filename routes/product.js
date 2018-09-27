const express = require('express');
const router = express.Router();

const validateAddProduct = require('../validation/addProduct')

//loading product schema
const Schema = require('../schema/Product')
//test route
router.get('/test', (req, res) => {

    return res.json({
        msg: 'test route working'
    })
})
router.post('/add', (req, res) => {
    const {error, isvalid} = validateAddProduct(req.body);

    if(!isvalid){
        return res.status(400).json(error);
    } else{
        const newProduct = new Schema({
            Name: req.body.Name,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
            Description: req.body.Description
        })
        newProduct
            .save()
            .then(newProduct => res.json(newProduct))
            .catch(err => console.log(err));
    }
})

//to show all products prsent in collection
router.get('/allproducts', (req, res)=>{
    Schema.find().select("Name Price Quantity").then(products =>{
        return res.status(200).json(products)
    })
})

// //to delete the collection
 router.delete('/:id',(req ,res)=>{
     Schema.findById(req.params.id)
     .then(product => product.remove().then(()=> res.json({success:"product delete successfully"})))
     .catch(err => res.status(404).json(err))
 })
module.exports = router;