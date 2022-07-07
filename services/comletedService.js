const CompletedModel = require('../models/CompletedModel')
const StatisticDto = require('../dtos/StatisticDto')
const userService = require('./authServices')
const quizService = require('./quizService')
const entersService = require('./EntersService')

class CompletedService{

    async addCompleted(userId, quizId,ip, description=[]){
        try{
            const currentCompleted = await CompletedModel.findOne({quiz:quizId, user:userId})
            const now = new Date()

            if(currentCompleted){
                currentCompleted.count+=1
                currentCompleted.dates.push(now)
                if(currentCompleted.description){
                    currentCompleted.description.push(description)
                }
                else{
                    currentCompleted.description = []
                    currentCompleted.description.push(description)
                }
                await currentCompleted.save()
            }
            else {
                const des = []
                des.push(description)

                const d = await CompletedModel.create({quiz:quizId, user:userId, ip, count:1, dates:[now],description:des})


            }
            return {warning:false, message:'Прохождение викторины добавлено'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:'Прохождение не добавлено. '+ e}
        }

    }

    async getProgress(){
        try {
            const progress = await CompletedModel.find()
            const enters = await entersService.getEnters()

            if(progress.length>0){
                const statistic = []
                progress.forEach(item=>{statistic.push({...new StatisticDto(item)})})
                const  progressMap = {}

                for (const item of statistic) {
                    //console.log(item)
                    const quiz  = await quizService.getQuizById(item.quiz)
                    const user = await userService.getUserById(item.user)
                    const username = user.user.username?user.user.username:'Удаленный пользователь'
                    const description = user.user.description?user.user.description:'Нет данных'
                    //console.log(quiz)
                    const data = {
                        quiz:quiz?quiz.title:'удаленный квиз',
                        count:item.count,
                        dates:[...item.dates],
                        progress: item.description

                    }

                    if(progressMap[username]){
                        progressMap[username].data.push({...data})
                    }
                    else{
                        progressMap[username] = { description}
                        progressMap[username].data = [{...data}]
                    }
                }


             //   console.log(JSON.stringify(progressMap))
             //    console.log('progressMap', progressMap)
                return {warning:false,data:{progress: {...progressMap}, enters} }
            }else{

                return {warning:false, data:{progress:[],enters}}
            }
        }
        catch (e) {
            console.log(e)
            return {warning:true, message:'Ошибка БД'}
        }
    }
}
module.exports = new CompletedService()
