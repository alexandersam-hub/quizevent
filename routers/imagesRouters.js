const {Router} = require('express')
const imageController = require('../controllers/imagesController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const router = new Router()


router.post('/upload', imageController.uploadImages)
router.post('/upload_svg', imageController.uploadSvg)
router.get('/get/:id', imageController.getImages)
router.get('/get_list',imageController.getImagesList )
module.exports = router