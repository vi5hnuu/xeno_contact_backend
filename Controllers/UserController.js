const { error: catchasyncError } = require('./../middlewares/catchAsync');
const { modal: User } = require('./../Modals/UserModal');
const { sendToken } = require('../utils/jwtToken')

//register user
exports.registerUser = catchasyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const exuser = await User.findOne({ email: email })
  if (exuser) {
    return res.status(404).json({
      success: false,
      message: 'user already exists...'
    })
  }
  const user = await new User({ username, email, password }).save()
  sendToken(user, 201, res)
})

//login user
exports.loginuser = catchasyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given pass and email
  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: 'Invalid email/password.'
    })
  }
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return res.status(404).json({
      status: false,
      message: 'User does not exists.'
    })
  }

  const isPassMatched = await user.comparePassword(password)
  if (!isPassMatched) {
    return res.status(404).json({
      status: false,
      message: 'Invalid email/password'
    })
  }
  sendToken(user, 200, res)
})

//log out user
exports.logoutuser = catchasyncError(async (req, res, next) => {
  res.clearCookie('token', { expires: new Date(Date.now()), httpOnly: true })
  res.status(200).json({
    success: true,
    message: 'Logout successful.'
  })
})
