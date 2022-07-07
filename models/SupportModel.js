const {Schema, model} = require('mongoose')

const SupportModel = new Schema({
    userId:{type:String},
    username:{type:String},
    mail:{type:String},
    text:{type:String},
    description:{type:String},
    isSend:{type:Boolean, default:false},
    isFinished:{type:Boolean, default:false}

})

module.exports = model('Support', SupportModel)