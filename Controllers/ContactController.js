const { error: catchasyncError } = require('../middlewares/catchAsync');
const { model: Contact } = require('./../Modals/ContactModal');
const mongoose = require('mongoose')


module.exports.addContact = catchasyncError(async (req, res, next) => {
  const { name, contact } = req.body

  const cnt = await Contact.create({ name, contact, user: req.user._id })
  res.status(200).json({
    success: true,
    message: 'Contact added successfully...',
    data: { contact: cnt }
  })
})


module.exports.getContacts = catchasyncError(async (req, res, next) => {
  const uid = req.user._id
  const contactsPerPage = 10;
  const pageNo = req.query.page || 1
  const contacts = await Contact.find({ user: uid }).skip((pageNo - 1) * contactsPerPage).limit(10)
  res.status(200).json({
    success: true,
    message: 'Contacts fetched successfully...',
    data: {
      contacts
    }
  })
})

module.exports.getContact = catchasyncError(async (req, res, next) => {
  const id = req.params.id

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: false,
      message: "Invalid contact id.",
    })
  }

  const contact = await Contact.findOne({ _id: id, user: req.user._id })
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'No Contact found...',
    })
  }
  res.status(200).json({ success: true, message: 'contact fetched successfully...', data: { contact } })
})


module.exports.updateContact = catchasyncError(async (req, res, next) => {
  const data = {}
  if (req.body.name) {
    data['name'] = req.body.name
  }
  if (req.body.contact) {
    data['contact'] = req.body.contact
  }
  const cid = req.params.id

  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(404).json({
      status: false,
      message: "Invalid contact id.",
    })
  }

  const uid = req.user._id
  const excontact = await Contact.findOneAndUpdate({ _id: cid, user: uid }, data, { new: true, runValidators: true })
  if (!excontact) {
    return res.status(404).json({
      success: false,
      message: 'No Contact found to update...',
    })
  }
  return res.status(200).json({ success: true, message: 'Contact updated successfuly...', data: { contact: excontact } })
})

module.exports.deleteContact = catchasyncError(async (req, res, next) => {
  const cid = req.params.id
  //check if id is valid
  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(404).json({
      status: false,
      message: "Invalid contact id.",
    })
  }

  const uid = req.user._id
  const exContact = await Contact.findOneAndDelete({ _id: cid, user: uid })
  if (!exContact) {
    return res.status(404).json({
      success: false,
      message: 'No Contact found to delete...',
    })
  }
  return res.status(200).json({ success: true, message: 'contact deleted successfully...', data: { contact: exContact } })
})

module.exports.getContactCount = catchasyncError(async (req, res, next) => {
  const contactCount = await Contact.countDocuments({ user: req.user._id })
  res.json({ success: true, message: `Total contacts are ${contactCount}.`, data: { total: contactCount } })
})