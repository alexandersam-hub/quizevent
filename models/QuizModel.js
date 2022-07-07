const {Schema, model} = require('mongoose')

const QuizSchema = new Schema({
    title:{type:String, unique:true, required:true},
    description:{type:String, required:true},
    category:{type:String},
    img:{type:String},
    isActive:{type:Boolean, required:true},

})

module.exports = model('Quiz', QuizSchema)