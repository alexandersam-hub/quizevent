

const supportService = require('../services/supportService')
const mailService = require('../services/mailService')
const tokenService = require('../services/tokenService')

class SupportController {

    async newPost(req,res,next){
        try{
            const {username, mail, text, token} = req.body
            let tokenData
            if(token)
                tokenData = tokenService.validationToken(token)
            else{
                tokenData = 'noname'
            }
            if(!username || !mail || !text)
                return res.json({warning:true, message:'Заполнены не все поля'})
            const post = await supportService.createNewPost(tokenData.id, username, mail, text)

            if(post.warning)
                return res.json({warning:true, message:post.message})

            const mailSendUser = await mailService.sendInformationUser(mail)
            const mailSendSupport = await mailService.sendInformationSupportService(username,text, mail,mailSendUser.warning )

            await supportService.mailIsSend(post.data.id)

            if (mailSendSupport.warning)
                return res.json({warning:true, message:'Не удалось связаться со службой техподдержки'})
            else{
                return res.json({warning:false, message:mailSendUser.warning?'Сообщение в службу технической поддержки отправлено. Проверьте адрес электронной почты':'Сообщение в службу технической поддержки отправлено. '})
            }
        }
        catch (e) {
            return res.json({warning:true, message:'Не удалось связаться со службой техподдержки. Попробуйте написать позже.'})
        }

    }

    async getPosts(req,res){
        try{
            const posts = await supportService.getPosts()
            console.log(posts,'posts')
            return res.json(posts)
        }
        catch (e) {
            return res.json({warning:true, message:'Ошибка базы данных'})
        }
    }

    async deletePost(req,res){
        try{
            const {id} = req.body
            if (!id){
                return res.json({warning:true, message:'Нет поля id'})
            }
            const result = await supportService.deletePost(id)
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Ошибка при удалении'})
        }
    }

    async updatePost(req,res){
        try{
            const {post} = req.body
            if(!post){
                return res.json({warning:true, message:'Нет необходимых полей'})
            }
            const result = await supportService.updatePost(post)
            return res.json(result)
        }
        catch (e) {
            return res.json({warning:true, message:'Ошибка изменения'})
        }
    }
}

module.exports = new SupportController()