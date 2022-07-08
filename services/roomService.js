const RoomModel = require('../models/RoomModel')
const RoomDto = require('../dtos/roomDto')
const QuizService = require('./quizService')

class RoomService{

    async getRoomById(id){
        try{
            const room = await RoomModel.findById(id)
            if(!room)
                return {warning:true, room:null}
            return {warning:false, room:new RoomDto(room)}
        }catch (e) {
            return {warning:true, message:'Ошибка получения '+ e}
        }
    }

    async addRoom(room,userData){
        try{
            if(room.id){
                const id = room.id

                if(id!=='new' && await RoomModel.findById(id))
                    return {warning:true, message:'Комната с данным id уже существует'}
                delete (room.id)
                room.user = userData.id
                const roomBd = await RoomModel.create({...room})
                return {warning:false, room: new RoomDto(roomBd)}
            }else{
                return {warning:true, message:'Не заполнено поле id'}
            }
        }catch (e) {
            return {warning:true, message:'Ошибка записи '+ e}
        }
    }

    async deleteRoom(roomId){
        try{
            await RoomModel.findByIdAndDelete(roomId)
            return {warning:false}
        }catch (e) {
            return {warning:true, message:'Ошибка получения '+ e}
        }
    }

    async updateRoom(room){
        try{
            if(room.id){
                const id = room.id
                delete (room.id)
                await RoomModel.findByIdAndUpdate(id, {...room})
                const roomBd = await RoomModel.findById(id)
                return {warning:false, room: new RoomDto(roomBd)}
            }else{
                return {warning:true, message:'Не заполнено поле id'}
            }
        }catch (e) {
            return {warning:true, message:'Ошибка получения '+ e}
        }
    }

    async getRooms(user){
        try{
            const roomsBd = await RoomModel.find({user})
           // console.log(user)
            const rooms = []
            roomsBd.forEach((room)=>{
                rooms.push(new RoomDto(room))
            })
            return {warning:false, rooms}
        }catch (e) {
            return {warning:true, message:'Ошибка получения комнат'+ e}
        }
    }

    async getRoomsByQuizId(quizId, userId){
        try{
            const roomsBd = await RoomModel.find({quiz:quizId, user:userId})
            // console.log(userId)
            const rooms = []
            roomsBd.forEach((room)=>{
                rooms.push(new RoomDto(room))
            })
            return {warning:false, rooms}
        }catch (e) {
            return {warning:true, message:'Ошибка получения комнат'+ e}
        }
    }

    async getAllInformation(user){
        try{
            const roomBd = await RoomModel.find({user})
            const quizBd = await QuizService.getAllQuiz()
            const rooms = []
            roomBd.forEach((room)=>{
                const r = new RoomDto(room)
                r.quiz = quizBd.find(q=>q.id === room.quiz)
                rooms.push(r)
            })
            return {warning:false, rooms}
        }catch (e) {
            return {warning:true, message:'Ошибка получения комнат'+ e}
        }
    }
}

module.exports = new RoomService()