const { error: catchAsyncError } = require('./catchAsync')
const jwt = require('jsonwebtoken');
const { modal: UserModal } = require('./../Modals/UserModal');

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'please login to access this resource.'
    })
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModal.findById(decodedData?.id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'The user belonging to token no longer exists.'
    })
  }
  req.user = user
  next()
})
module.exports.isAuthenticatedUser = isAuthenticatedUser