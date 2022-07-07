const authService = require('../services/authServices')
const tokenService = require('../services/tokenService')

class AuthController{

    async login(req,res,next){
        try{
            const {username, password} = req.body
            const result = await authService.login(username, password)
            if (result.warning) {
                return  res.json({warning: true, message: result.messageRu})
            }
            return res.json({warning: false, data: {token: result.token}})
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

    async addDescription(req,res){
        try{

            const {descriptionText, token} = req.body
            // console.log(descriptionText,token )
            if (!descriptionText || !token ) {
                return  res.json({warning: true, message: 'Не все поля заполнены верно'})
            }
            const tokenData = tokenService.validationToken(token)
            const result = await authService.addDescription(tokenData.id, descriptionText)

            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:"Ошибка при добавлении описания"})
        }
    }

    async loginByToken(req,res,next){
        const {token_qr} = req.body

        if(!token_qr){
            return res.json({warning:true, message:'нет токена'})
        }
        const result = await authService.loginByToken(token_qr)
        // console.log('result',result)
        if (result.warning) {
            return  res.json({warning: true, message:'Ошибка авторизации qr'})
        }

        return res.json({warning: false, data: {token: result.token}})
    }

    async loginByQr(req,res,next){
        const token  = req.params['token']
       // console.log(token)
        //console.log(token)
        if(!token){
            return res.json({warning:true, message:'нет токена'})
        }
        const result = await authService.loginByToken(token)
        if (result.warning) {
            return  res.json({warning: true, message:'Ошибка авторизации2'})
        }

        return res.json({warning: false, data: {token: result.token}})
        // if(!token){
        //     return res.json({warning:true, message:'нет токена'})
        // }
        // const result = await authService.loginByToken(token)
        // if (result.warning) {
        //     return  res.json({warning: true, message:'Ошибка авторизации'})
        // }
        //
        // return res.json({warning: false, data: {token: result.token}})
    }

    async registration(req,res,next){
        try{
            const {username, password, role, description, isActive} = req.body
            //console.log(username, password, role, description, isActive)
            if(username && password && role){
                const result = await authService.registration(username, password, role, isActive, description)
                if(result.warning){
                    return res.json({warning:true, data:{
                            message:`Пользователь ${username} не создан. ${result.messageRu}`
                        }})
                }
                return res.json({warning:false, data:{
                    message:`Пользователь ${username} создан`
                }})
            }
            else{
                return res.json({warning:true, data:{
                        message:`Пользователь ${username} не создан`
                    }})
            }
        }
        catch (e) {
            next(e)

        }
    }
    async getUsers(req,res,next) {
        try{
            const result = await authService.getUsers()
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Ошибка получения пользователей'})
        }
    }



    async updateUser(req,res,next){
        try{

            const {user} = req.body
            if(user){
                const result = await authService.updateUsersData(user.id, user)
                return res.json(result)
            }
            else{
                return res.json({warning:true, data:{
                        message:`Пользователь не изменен`
                    }})
            }
        }
        catch (e) {
            next(e)
        }
    }

    async updateUserPassword(req,res,next){
        try{
            const {userid, password} = req.body
            if(userid && password){
                const result = await authService.updateUserPassword(userid, password)
               return res.json(result)
            }
            else{
                return res.json({warning:true, message:`Пароль не изменен`})
            }
        }
        catch (e) {
            next(e)
        }
    }
    async generateToken(req,res,next){
        try{
            const {username, password} = req.body
            // console.log(username, password)
            if(username && password){
                const result = await tokenService.generationToken({username, password})
                //console.log('token', result)
                const url = process.env.URL_CLIENT_QUIZ+'/qr/'+result
                return res.json({warning:false, data:{token:url}})
            }
            else{
                return res.json({warning:true, message:`username или password не переданы`})
            }
        }
        catch (e) {
            next(e)
        }
    }

    async deleteUser(req,res,next){
        try{
            const {userid} = req.body
            if(userid){
                const result = await authService.deleteUser(userid)
                return res.json(result)
            }
            else{
                return res.json({warning:true, message:`UserId не передан`})
            }
        }
        catch (e) {
            next(e)
        }
    }


}

module.exports = new AuthController()