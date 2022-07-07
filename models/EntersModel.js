const {Schema, model} = require('mongoose')

const EntersModel = new Schema({

    user:{type:Schema.Types.ObjectId, ref:'User'},
    dates:{type:[Date]},
    description:{type:String},

})

module.exports = model('Enters', EntersModel)