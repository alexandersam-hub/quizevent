const roomService = require('../services/roomService')
const tokenService = require('../services/tokenService')
const GameSocketController = require('./GameSocketController')

class RoomController{
    async addRoom(req,res){
        try {
            const {room, token} = req.body
            const userData = tokenService.validationToken(token)
            if(!room)
                return res.json({warning:true, message:'не заполнено поле room'})
            const result = await roomService.addRoom(room, userData)

            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async getRooms(req,res){
        try {
            const {token} = req.body
            const userData = tokenService.validationToken(token)
            const result = await roomService.getRooms(userData.id)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async getRoomsByQuizId(req,res){
        try {
            const {quiz_id,token} = req.body
            const userData = tokenService.validationToken(token)
            const result = await roomService.getRoomsByQuizId(quiz_id, userData.id)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async updateRoom(req,res){
        try {
            const {room} = req.body
            if (!room) return  res.json({warning:true, message:'Не передано room'})
            const result = await roomService.updateRoom(room)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async delRoom(req,res){
        try {
            const {id} = req.body
            if (!id) return  res.json({warning:true, message:'Не заполнено поле id'})
            const result = await roomService.deleteRoom(id)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async getRoomById(req,res){
        try {
            const {id} = req.body
            if (!id) return  res.json({warning:true, message:'Не заполнено поле id'})
            const result = await roomService.getRoomById(id)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }

    async getTokenRoom(req,res){
        try {
            const {team, room} = req.body
            const token = tokenService.generationToken({team, room})
            return res.json({warning:false, token})
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }
    async getAllInformationQuiz(req,res){
        try{
            const {token} = req.body
            const userData = tokenService.validationToken(token)
            const result = await roomService.getAllInformation(userData.id)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, data:'Ошибка сервера'})
        }

    }

    async resetScore(req,res){
        try{
            const {room} = req.body
            GameSocketController.resetScore(room.id)
            const result = await roomService.updateRoom(room)
            return res.json(result)
        }catch (e) {
            return res.json({warning:true, data:'Ошибка сервера'})
        }


    }
}

module.exports = new RoomController()