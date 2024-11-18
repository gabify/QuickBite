const express = require('express')
const router = express.Router()

const {signUp} = require('../controllers/userController')

//sign up route
router.post('/register', signUp)

module.exports = router