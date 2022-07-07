const {Router} = require('express')
const constructorController = require('../controllers/constructorController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = new Router()

router.post('/question/add',adminMiddleware, constructorController.addQuestion)
router.post('/question/update',adminMiddleware, constructorController.updateQuestion)
router.post('/question/remove', adminMiddleware, constructorController.removeQuestion)

router.post('/quiz/add', adminMiddleware, constructorController.addQuiz)
router.post('/quiz/update', adminMiddleware, constructorController.updateQuiz)
router.post('/quiz/remove', adminMiddleware, constructorController.removeQuiz)

module.exports = router