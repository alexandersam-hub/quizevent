const questionService = require('../services/questionService')
const tokenService = require('../services/tokenService')
const userService = require('../services/authServices')
class QuestionController {

   async getQuestionById(req, res, next) {
       try {
           const {quizId,token} = req.body
           const user = tokenService.validationToken(token)
           const userBd = await userService.getUserById(user.id)

           const questions = await questionService.getQuestionByQuizId(quizId)
           if (questions) {
               let simple = false
               if(userBd.user.username.substring(0,3) === 'rus')
                   simple = true
               return res.json({warning: false, data: questions, simple})
           }
           return res.json({warning: true, message: "Нет доступных заданий для выбранного квеста"})
       }
       catch (e) {
           console.log(e)
           next(e)
       }
   }

    async getAllQuestionById(req, res, next) {
        try {
            const {quizId} = req.body
            const questions = await questionService.getAllQuestionByQuizId(quizId)
            if (questions) {
                return res.json({warning: false, data: questions})
            }
            return res.json({warning: true, message: "Нет доступных заданий для выбранного квеста"})
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

}

module.exports = new QuestionController()