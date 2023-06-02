//creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  //Toptions for cookies
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user: { username: user.username, email: user.email },
    token
  })
}

module.exports.sendToken = sendToken