const {Schema, model} = require('mongoose')

const QuestionSchema = new Schema({
    title:{type:String, required:true},
    quiz:{type:Schema.Types.ObjectId, ref:'Quiz'},
    type:{type:String, required:true},
    text:{type:String, required:true},
    answer:{type:String, required:true},
    price:{type:Number},
    img:{type:String},
    video:{type:String},
    isActive:{type:Boolean, required:true},

})

module.exports = model('Question', QuestionSchema)