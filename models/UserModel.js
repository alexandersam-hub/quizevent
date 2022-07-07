const {Schema, model} = require('mongoose')

const UserModel = new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String, required: true},
    role:{type:String,required: true },
    isActive:{type:Boolean, required: true, default:true},
    description:{type:String},
})

module.exports = model('User',UserModel)