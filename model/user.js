const{ Schema, model,Types} = require('mongoose')

const schema = new Schema({
    login:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    role:{type:String,require:false,unique:false,default:'user'}
})

module.exports = model('User',schema)