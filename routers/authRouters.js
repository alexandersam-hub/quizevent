const {Router} = require('express')
const authController = require('../controllers/authController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const createCard = require('../controllers/CreatedCardController')

const router = new Router()

router.post('/login_qr', authController.loginByToken)
//router.get('/login_qr/:token', authController.loginByQr)
router.post('/login', authController.login)
router.post('/add_description', authController.addDescription)
router.post('/registration',adminMiddleware, authController.registration)
router.post('/get_users',adminMiddleware,authController.getUsers )

router.post('/update_user',adminMiddleware,authController.updateUser )
router.post('/update_user_password',adminMiddleware, authController.updateUserPassword)
router.post('/delete_user', adminMiddleware, authController.deleteUser)
router.post('/generate_token',adminMiddleware, authController.generateToken)

router.post('/card_qr/generate', createCard.generationCard)

module.exports = router