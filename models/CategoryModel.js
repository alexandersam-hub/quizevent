const {Schema, model} = require('mongoose')

const CategoryModel = new Schema({
    name:{type:String,  required:true, unique:true },
    img:{type:String}
})

module.exports = model('Category', CategoryModel)