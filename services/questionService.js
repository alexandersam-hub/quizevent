const QuestionModel = require('../models/QuestionModel')
const QuestionDto = require('../dtos/QuestionDto')
const QuizService = require('./quizService')
const categoryService = require('./categoryService')
class QuestionService{

    async getQuestionByQuizId(quizId){
        const quiz = await QuizService.getQuizById(quizId)
        const category = await categoryService.getCategoryByName(quiz.description)
        let categoryImg = ''
        if(!category.warning){
            categoryImg = category.category.img
        }
        if(!quiz)
            return null
        const questions = await QuestionModel.find({quiz:quizId, isActive:true})
        if(!questions)
            return null
        const questionsDto = []
        questions.forEach((question,index)=>{
            // if(index<3)
            // {
                question.img = question.img.replace('https://quizserver.vityazgroup.ru:8443',  process.env.URL_SERVER)
                questionsDto.push({...new QuestionDto(question)})
                questionsDto.sort((item, next)=>item.price - next.price)
            // }

        })
        return {questions:questionsDto, quizName:quiz.title, categoryImg}
    }

    async getAllQuestionByQuizId(quizId){
        const quiz = await QuizService.getQuizById(quizId)
        const questions = await QuestionModel.find({quiz:quizId})
        if(!questions)
            return null
        const questionsDto = []
        questions.forEach(question=>{
            questionsDto.push({...new QuestionDto(question)})
        })
        return {questions:questionsDto, quizName:quiz.title}
    }
}

module.exports = new QuestionService()