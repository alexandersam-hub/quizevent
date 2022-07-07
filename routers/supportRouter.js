const {Router} = require('express')
const supportController = require('../controllers/supportController')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = new Router()

router.post('/add',supportController.newPost)
router.post('/get',adminMiddleware, supportController.getPosts)
router.post('/delete',adminMiddleware,supportController.deletePost)
router.post('/update',adminMiddleware, supportController.updatePost)

module.exports = router