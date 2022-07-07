const {Router} = require('express')
const roomController = require('../controllers/roomController')

const router = new Router()

router.post('/add',roomController.addRoom)
router.post('/get',roomController.getRooms)
router.post('/get_by_quiz_id',roomController.getRoomsByQuizId)
router.post('/update',roomController.updateRoom)
router.post('/del',roomController.delRoom)
router.post('/get_token',roomController.getTokenRoom)
router.post('/get_room_by_id',roomController.getRoomById)
router.post('/get_all_information', roomController.getAllInformationQuiz)

module.exports = router