const express = require('express')
const router = express.Router()

const {login,login1,verify,userData, register, forgetPassword, resetPassword1, resetPassword} = require('../controllers/user')
router.route('/').post(login1)
router.route('/verify').post(verify)
router.route('/userData').post(userData)
router.route('/register').post(register) 
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:id/:token').post(resetPassword1).get(resetPassword)

module.exports = router