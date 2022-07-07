const {Router} = require('express')
const categoryController = require('../controllers/categoryController')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = new Router()

router.post('/get', categoryController.getCategory)
router.post('/add',adminMiddleware, categoryController.addCategory)
router.post('/update',adminMiddleware, categoryController.updateCategory)
router.post('/del',adminMiddleware, categoryController.delCategory )

module.exports = router