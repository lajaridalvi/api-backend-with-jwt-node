 const mongoose = require ('mongoose');

 const Schema = mongoose.Schema;
 const productSchema = new Schema ({
      Name:{type:String , required:true},
      Price:{type:Number , required:true},
      Quantity:{type: Number , required:true},
      Description :{ type:String , required:true},
      Date:{ type:Date , default:Date.now}
 })
 module.exports = mongoose.model('products' ,productSchema)
