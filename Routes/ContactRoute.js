const express = require('express')
const { addContact, getContacts, getContact, updateContact, deleteContact, getContactCount } = require('../Controllers/ContactController')
const { isAuthenticatedUser } = require('../middlewares/auth')
const router = express.Router()

router.route('/contacts').get([isAuthenticatedUser, getContacts])

router.route('/contacts/total').get([isAuthenticatedUser, getContactCount])

router.route('/contact/:id').get([isAuthenticatedUser, getContact])
  .put([isAuthenticatedUser, updateContact])
  .delete([isAuthenticatedUser, deleteContact])

router.route('/contact').post([isAuthenticatedUser, addContact])

module.exports.route = router