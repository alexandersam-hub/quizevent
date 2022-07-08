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
                console.log(room)
                const roomBd = await RoomModel.create({...room})
                console.log("roomBd",roomBd)
                console.log(' new RoomDto(roomBd)', new RoomDto(roomBd))
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

    async getRooms(){
        try{
            const roomsBd = await RoomModel.find()
            const rooms = []
            roomsBd.forEach((room)=>{
                rooms.push(new RoomDto(room))
            })
            return {warning:false, rooms}
        }catch (e) {
            return {warning:true, message:'Ошибка получения комнат'+ e}
        }
    }

    async getRoomsByQuizId(quizId){
        try{
            const roomsBd = await RoomModel.find({quiz:quizId})
            const rooms = []
            roomsBd.forEach((room)=>{
                rooms.push(new RoomDto(room))
            })
            return {warning:false, rooms}
        }catch (e) {
            return {warning:true, message:'Ошибка получения комнат'+ e}
        }
    }

    async getAllInformation(){
        try{
            const roomBd = await RoomModel.find()
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