const UserModel = require('../models/UserModel')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/UserDto')
const bcrypt = require('bcrypt')
const entersService = require('./EntersService')

class AuthServices {

    async loginByToken(token){
        const dataUser = tokenService.validationQrToken(token)
        //console.log('dataUser', dataUser)
        if(dataUser)
            return await this.login(dataUser.username, dataUser.password)
        return {warning:true, massage:'Некорректный токен'}
    }

    async login(login, password) {
        const user = await UserModel.findOne({username: login})
        if(!user)
            return {warning: true, message: 'User is not found', messageRu: "Пользователь не найден"}
        if (!user.isActive)
            return {warning: true, message: 'User is not active', messageRu: "Пользователь заблокирован"}
        const isPassEquals = bcrypt.compareSync(password, user.password)
        if (isPassEquals) {
            const userDto = new UserDto(user)
            await entersService.addEnter(userDto.id)
            const newToken = tokenService.generationToken({...userDto})
            await tokenService.tokenSave(userDto.id, newToken)
            return {
                warning: false,
                token: newToken
            }
        }
        return {warning: true, message: 'Error password', messageRu: "Неверный пароль"}
    }

    async registration(username, password, role,isActive, description){
        try {
            const candidate = await UserModel.findOne({username})
            if(candidate)
                return {warning:true, messageRu:'Пользователь с таким именем существует'}
            const cashPassword = bcrypt.hashSync(password,7)
            const newUser = await UserModel.create({username, password:cashPassword, role, isActive, description})
            return newUser
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async getUsers(){
        try{
            const users = await UserModel.find()
            const userDto = []
            users.forEach((item)=>{
                const user = new UserDto(item)
                delete(user.password)
                userDto.push(user)
            })
            //console.log(userDto)
            return  {warning:false, data:userDto}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async updateUsersData(userId, userDto){
        try {
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}
            user.username = userDto.username
            user.isActive = userDto.isActive
            user.description = userDto.description
            user.role = userDto.role
            await user.save()
            return {warning:false, message:'Пароль пользователя изменен'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async getUserById(userId){
        try {
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}

            return {warning:false, user:{...new UserDto(user)}}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async updateUserPassword(userId, newPassword){
        try {
            const cashPassword = bcrypt.hashSync(newPassword,7)
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}
            user.password = cashPassword
            await user.save()
            return {warning:false, message:'Пароль пользователя изменен'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }

    }

    async deleteUser(userId){
        try {
            await UserModel.findByIdAndDelete(userId)

            return {warning:false, message:'Пользователь удален'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка базы данных при удалении'}
        }
    }
    async removeUserByUserName(username){
        try{
            const res = await UserModel.findOneAndDelete({username})
            return true
            if(res)
                return {warning:false, messageRu:'Описание добавлено'}
        }
    catch (e) {
            return {warning:true, messageRu:'Ошибка базы данных при удалении'}
        }
    }
    async addDescription(userId, descriptionText){
        try{
            const res = await UserModel.findByIdAndUpdate(userId, {description:descriptionText})
            if(res)
                return {warning:false, messageRu:'Описание добавлено'}
        }
        catch (e) {
            return {warning:true, messageRu:'Ошибка базы данных при удалении'}
        }
    }

}

module.exports = new AuthServices()