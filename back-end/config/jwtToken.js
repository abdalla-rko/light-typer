const jwt = require('jsonwebtoken')
const User = require('../models/User');
const cookie = require('cookie');

async function createJsonWebToken(email, res) {
  const userData = await User.findOne({email: email}, {_id: 1, username: 1, profile_pic: 1})
  const userId = userData._id
  await User.updateOne({ _id: userId }, {
    $set: { isOnline: true }
  })
  const username = userData.username;
  const userPicture = userData.profile_pic
  console.log('************ picture', userPicture);
  const token = jwt.sign({_id: userId, username: username, picture: userPicture}, process.env.TOKEN_SECRET)
  const refreshToken = jwt.sign({_id: userId, username: username, picture: userPicture}, process.env.REFRESH_TOKEN_SECRET)
  await User.updateOne({_id: userId}, {
    refresh_token: refreshToken
  })
  const setCookie = cookie.serialize('Authorization', 'Bearer ' + token, {
    maxAge: 60 * 40,
    path: '/',
    httpOnly: true
  })
  res.setHeader('Set-Cookie', setCookie);
  res.json({_id: userId, username: username, picture: userPicture});
}

function refreshAndCheckToken(req, res) {
  if (req.headers.cookie){
    const parseHeader = cookie.parse(req.headers.cookie)
    if (parseHeader.Authorization) {
      console.log('testing');
      const authHeader = parseHeader.Authorization.split(' ')[1];
      jwt.verify(authHeader, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return {}
        req.user = user
        const refreshToken = await User.findOne({_id: user._id}, {_id: 0, refresh_token: 1})
        if (!refreshToken) return {}
        jwt.verify(refreshToken.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) return {}
          const accessToken = jwt.sign({_id: user._id, username: user.username, picture: user.picture}, process.env.TOKEN_SECRET);
          
          const setCookie = cookie.serialize('Authorization', 'Bearer ' + accessToken, {
            maxAge: 60 * 40,
            path: '/'
          })
          res.cookie('Authorization', authHeader, {maxAge: Date.now()})
          console.log('authHeader', authHeader);
          console.log('accses', accessToken);
          res.setHeader('Set-Cookie', setCookie)
          return res.json({_id: user._id, username: user.username, picture: user.picture})
        })
      })
    } else {
      return {}
    }
  } else {
    return {}
  }
}

module.exports = {
  createJsonWebToken,
  refreshAndCheckToken
}