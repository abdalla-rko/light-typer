const router = require('express').Router();
const {OAuth2Client} = require('google-auth-library');
const {createJsonWebToken, refreshAndCheckToken} = require('../config/jwtToken')
const User = require('../models/User');

router.post('/logged', (req, res) => {
  refreshAndCheckToken(req, res)
})

router.post('/google', (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idtoken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userName = payload['name'];
    const userEmail = payload['email'];
    const picture = payload['picture'];

    const emailLowerCase = userEmail.toLowerCase()
    const emailExist = await User.findOne({email: emailLowerCase})
    if(emailExist) {
      return await createJsonWebToken(emailLowerCase, res)
    }

    const user = new User({
      username: userName,
      email: emailLowerCase,
      profile_pic: picture
    })
    try {
      await user.save()
      await createJsonWebToken(user.email, res)
    } catch (err) {
      console.log(err);
    }
  }
  verify().catch(console.error);
})


router.post('/logout', async (req, res) => {
  // await User.findOneAndUpdate({ _id: req.user._id }, {
  //   $set: { isOnline: false }
  // })
  res.cookie('Authorization', {maxAge: Date.now()})
  // res.redirect('/auth');
  console.log('done logout');
});

module.exports = router 