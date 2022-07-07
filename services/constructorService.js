
const QuestionModel = require('../models/QuestionModel')
const QuizModel = require('../models/QuizModel')

class ConstructorService{

    async addQuiz(quizDto){
        try {

            const quizDB = await QuizModel.findOne({title:quizDto.title})
            if(quizDB)
                return {warning:true, message:`Викторина ${quizDto.title} уже существует`}
            delete (quizDto.id)
            const newQuiz = await QuizModel.create({...quizDto})
            if(newQuiz)
                return {warning:false, message:`Викторина ${quizDto.title} добавлена`}
            return {warning:true, message:`Викторина ${quizDto.title} не добавлена`}
        }
     catch (e) {
         console.log(e)
         return {warning:true, message:`Викторина ${quizDto.title} не добавлена. Ошибка записи в БД`}
     }
    }

    async addQuestion(questionDto){
        try {
            delete (questionDto.id)
            const newQuestion = await QuestionModel.create({...questionDto})
            if(newQuestion)
                return {warning:false, message:`Вопрос ${questionDto.title} добавлен в викторину`}
            return {warning:true, message:`Вопрос ${questionDto.title} не был добавлен. Ошибка БД`}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:`Вопрос ${questionDto.title} не был добавлен. Исключение БД`}
        }
    }

    async updateQuestion(questionDto){
        try{

            const id = questionDto.id
            delete (questionDto.id)
            await QuestionModel.findByIdAndUpdate(id, {...questionDto})

            return {warning:false, message:`Вопрос изменен`}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:`Вопрос не был изменен. Исключение БД`}
        }
    }

    async updateQuiz(quizDto){
        try{

                const quiz = await QuizModel.findById(quizDto.id)
                quiz.title = quizDto.title
                quiz.description = quizDto.description
                quiz.category = quizDto.category
                quiz.img = quizDto.img
                quiz.isActive = quizDto.isActive
                await quiz.save()
                return {warning:false, message:`Викторина изменена`}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:`Викторина не была изменена. Исключение БД`}
        }
    }

    async removeQuestion(questionId){
        try {
            //console.log(questionId)
            await QuestionModel.findByIdAndDelete(questionId)



                return  {warning:false}


        }
        catch (e) {
            return {warning:true, message:`Вопрос не был удален. Исключение БД`}
        }

    }

    async removeQuiz(quizId){
        try {
            await QuizModel.findByIdAndDelete(quizId)
                return {warning:false}

        }
        catch (e) {
            return {warning:true, message:`Викторина не была удалена. Исключение БД`}
        }
    }
}

module.exports = new ConstructorService()
