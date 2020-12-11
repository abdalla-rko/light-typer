const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const authRoute = require('./routes/auth');

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(cors())



app.use('/auth', authRoute)


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},
  console.log('connected to DB')
);

app.listen(process.env.PORT, () => console.log(`Server has started on port ${process.env.PORT}`))