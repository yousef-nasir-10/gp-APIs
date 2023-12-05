const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')

const {getFile} = require('../controllers/file')
router.use(fileUpload())
router.route('/').post(getFile)

module.exports = router 