const express = require('express')
const router = express.Router()
const {
    creatIssue,
    try1
} = require('../controllers/issue')
router.route('/').post(creatIssue).get(try1)

module.exports = router 