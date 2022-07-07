const {Schema, model} = require('mongoose')

const RoomSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    user:{type:String},
    quiz:{type:String},
    countTeam:{type:Number},
    teamsName:{type:[String]},
    type:{type:String},
    progress:{type:Object},
    isActive:{type:Boolean, required:true},
})

module.exports = model('Room', RoomSchema)