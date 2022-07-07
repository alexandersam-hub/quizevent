const EntersModel = require('../models/EntersModel')
const EntersDto = require('../dtos/EnterDto')
const UserModel = require('../models/UserModel')

class EntersService{

    async addEnter(userId){
        try{
            const now = new Date()
            const enterBd = await EntersModel.findOne({user:userId})
            if(enterBd){
                enterBd.dates.push(now)
                await enterBd.save()
                return true
            }
            await EntersModel.create({user:userId, dates:[now], description:''})
            return true
        }catch (e) {

        }
    }

    async getEnters(){
        try{
            const enterBd = await EntersModel.find()
            const enters = []

            for(let enter of enterBd){
                const user = await UserModel.findById(enter.user.toString())
                if(!user.warning){
                    enters.push(
                        {
                            user:user.username,
                            dates:enter.dates,
                            description:enter.description,
                            organization:user.description
                        }
                    )
                }
            }

            return enters

        }catch (e) {
            console.log(e)
            return []
        }
    }

    async getIsEnterByUserId(userId){
        try{
            const enterBd = await EntersModel.find({userId})
            if(enterBd){
                return true
            }
            return false
        }catch (e) {
            return false
        }
    }
}

module.exports = new EntersService()