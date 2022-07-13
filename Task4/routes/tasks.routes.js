const router = require('express').Router()
const TaskController = require('../controller/Tasks.controller')


router.get("/", TaskController.AllTasks)

router.get("/add", TaskController.addTaskPage)
router.post("/add", TaskController.addTaskLogic)

router.get('/single/:title', TaskController.showSingle)

router.get('/edit/:title', TaskController.editSinglePage)
router.post('/edit/:title', TaskController.editSingleLogic)

router.post('/delAll', TaskController.delAll)

router.get('/del/:title', TaskController.delUser)

module.exports = router
