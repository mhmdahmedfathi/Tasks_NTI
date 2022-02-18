const router = require('express').Router()
const bankController = require('../controller/bank.cotroller')


router.get("/", bankController.Allaccounts)

router.get("/add", bankController.addAccPage)
router.post("/add", bankController.addAccLogic)

router.get('/single/:_id', bankController.showSingle)

router.get('/addTransaction/:_id',bankController.addTransactionPage)
router.post('/addTransaction/:_id',bankController.addTransactionLogic)

router.get('/edit/:_id', bankController.editSinglePage)
router.post('/edit/:_id', bankController.editSingleLogic)

router.post('/delAll', bankController.delAll)

router.get('/del/:_id', bankController.delUser)


module.exports = router
