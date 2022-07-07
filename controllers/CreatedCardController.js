const createQrCard = require('../services/createQrCard')
const userService = require('../services/authServices')
const tokenService = require('../services/tokenService')
class CreatedCardController{



    async generationCard(req, res){
            const {prefix, index_start, index_stop} = req.body
            const createdCardList = []
            const wrongCreatedCardList = []

            const  getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

            if(prefix && index_start && index_stop){
                for (let i = index_start; i<=index_stop; i++){
                    setTimeout(async ()=>{
                        const n = i>9?i:'0'+i
                        const name = prefix+'_'+ n
                        const password = getRandomInt(100001, 999999).toString()
                        const user = await userService.registration(name, password, 'user', true, '')
                        const token ='https://xn--80adsajtfqq.xn--c1abdmxeng9ge.xn--p1ai/qr/'+ await tokenService.generationToken({username:name, password})
                        console.log(user)
                        if (!user.warning && await createQrCard.createQrCard(name, password, token))
                            createdCardList.push(name)
                        else
                            wrongCreatedCardList.push(name)
                    },700)

                }
                console.log(createdCardList)
                console.log(wrongCreatedCardList)
                return ({warning:false, listCreated:createdCardList, wrongList:wrongCreatedCardList})
            }
            return res.json({warning:true, message:'Не все данные заполнены'})

    }
}

module.exports = new CreatedCardController()