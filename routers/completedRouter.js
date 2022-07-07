const {Router} = require('express')
const completedController = require('../controllers/completedController')

const router = new Router()

router.post('/', completedController.addCompleted)
router.post('/get_progress', completedController.getProgress)

module.exports = router