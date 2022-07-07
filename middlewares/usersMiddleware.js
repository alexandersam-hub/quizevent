const tokenService = require('../services/tokenService')
const userService = require('../services/authServices')

async function usersMiddleware(req, res, next) {
    const {token} = req.body
    // console.log(token)
    if(!token){
        return res.json({badToken:true})
    }
    const user = tokenService.validationToken(token)
    if(!user || !user.id){
        return res.json({badToken:true})
    }
    const userBd = await userService.getUserById(user.id)
    // console.log(userBd)
    if( userBd.warning || !userBd.user.isActive )
        return res.json({badToken:true})
    if(!userBd.user.description){

        req.body.marker = "not_description"
       // console.log(req.body)
    }
    //console.log(userBd)


    if(!(user.role === 'admin' || user.role === 'user') )
        return res.json({badPage:true})
    next()
}

module.exports = usersMiddleware