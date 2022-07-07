const {Router} = require('express')
const quizController = require('../controllers/quizController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const userMiddleware = require('../middlewares/usersMiddleware')

const router = new Router()

router.post('/get_all',userMiddleware,quizController.getAllActiveQuiz)
router.post('/get_all_admin',adminMiddleware, quizController.getAllQuiz)

module.exports = router