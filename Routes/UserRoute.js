const express = require('express')
const { registerUser, loginuser, logoutuser } = require('../Controllers/UserController')
// const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginuser)
router.route('/logout').get(logoutuser)

module.exports.route = router