const mongoose =  require('mongoose')
const Schema =  mongoose.Schema;

const userSchema =  new Schema({
    email:{type:String , default:'', require:true},
    password:{type:String , default:'', require:true},
    cpassword:{ type:String, default:'', require:true},
    firstName:{type:String , default:''},
    lastName:{type:String , default:''},
    address:{ type:String , default:''}
})

module.exports =  mongoose.model('user',userSchema);