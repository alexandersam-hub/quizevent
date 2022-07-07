const tokenService = require('../services/tokenService')

function adminMiddleware(req, res, next) {

    const {token} = req.body
   // console.log(token)
    if(!token){
        return res.json({badToken:true})
    }
    const user = tokenService.validationToken(token)
    if( !user || !user.isActive)
        return res.json({badToken:true})
    if(user.role !== 'admin')
        return res.json({badPage:true})
    next()
   // console.log(user)
}

module.exports = adminMiddleware