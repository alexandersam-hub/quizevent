const {Router} = require('express')
const questionController = require('../controllers/questionController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const userMiddleware = require('../middlewares/usersMiddleware')
const router = new Router()

router.post('/get_by_id',userMiddleware, questionController.getQuestionById)
router.post('/get_by_id_admin',adminMiddleware, questionController.getAllQuestionById)

module.exports = router