
const tokenService = require('../services/tokenService')
const completedService = require('../services/comletedService')

class CompletedController{

    async addCompleted(req,res,next){
        try {
            const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
            const {token, quiz, description} = req.body
            const user = tokenService.validationToken(token)
            let result
            if (description)
                 result = await completedService.addCompleted(user.id, quiz, ip, description)
            else
                 result = await completedService.addCompleted(user.id, quiz, ip, [])
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Возникла ошибка при добавлении прогресса'})
        }


    }
    async getProgress(req,res){
        try{
            const progress = await completedService.getProgress()
            return res.json(progress)
        }catch (e) {
            return res.json({warning:true, message:'Ошибка сервера'})
        }
    }


}

module.exports = new CompletedController()