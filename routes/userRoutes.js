const express = require('express')
const router = express.Router()

const ctrls = require('../controllers/userController')
router.get('/getAll', ctrls.getAllUsers)
router.post('/login', ctrls.login)
router.post('/register', ctrls.register)
// router.put('/update', ctrls.updateBoard)
// router.post('/create', ctrls.addTaskToBoard)

module.exports = router