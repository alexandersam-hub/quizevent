const constructorService = require('../services/constructorService')

 class ConstructorController {

    async addQuiz(req, res, next) {
        try {
        const {quiz} = req.body
        if (quiz) {
            const result = await constructorService.addQuiz(quiz)
            if(result.warning)
                return res.json({...result})
            return res.json({warning:false, message:`Викторина ${quiz.title} добавлена`})
        } else {
            return res.json({warning:true, message:`Викторина не была создана. Не были заполнены все поля.`})
        }
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

    async addQuestion(req, res, next) {
        try {

            const { question } = req.body
            if (question) {
                const result = await constructorService.addQuestion(question)
                if (result) {
                    return res.json({...result})
                }
            }
            return res.json({warning: true, message: `Вопрос не был сохранен. Заполнены не все поля`})
        }
        catch (e) {
            console.log(e)
            next(e)
        }

    }

    async updateQuiz(req,res,next){
        try{
            const {quiz} = req.body
            if(!quiz){
                return res.json({warning:true, message:"Не заполнены поля"})
            }
            const result = await constructorService.updateQuiz(quiz)
            return res.json(result)
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

     async updateQuestion(req,res,next){
         try{
             const {question} = req.body
             //console.log('question', question)
             if(!question){
                 return res.json({warning:true, message:"Не заполнены поля"})
             }
             //console.log('question',question)
             const result = await constructorService.updateQuestion(question)
             return res.json(result)
         }
         catch (e) {
             console.log(e)
             next(e)
         }
    }

     async removeQuestion(req,res,next) {
         try {

             const {id} = req.body
             if(!id){
                 return res.json({warning:true, message:"Не заполнены поля"})
             }
             const result = await constructorService.removeQuestion(id)
             return res.json(result)

         } catch (e) {
             console.log(e)
             next(e)
         }
     }

     async removeQuiz(req,res,next) {
         try {
             const {id} = req.body
             if(!id){
                 return res.json({warning:true, message:"Не заполнены поля"})
             }
             const result = await constructorService.removeQuiz(id)
             return res.json(result)
         } catch (e) {
             console.log(e)
             next(e)
         }
     }
}

module.exports = new ConstructorController()