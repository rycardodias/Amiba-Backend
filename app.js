const express = require('express')
const cors = require("cors")
const cookieSession = require('cookie-session')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const db = require('./config/database')
dotenv.config()
// db.sync({ force: true })

// db.authenticate()
//    .then(()=> console.log('Connection has been established successfully.'))
//    .catch((error)=> console.error('Unable to connect to the database:', error))

const app = express();
app.set('trust proxy', true)
app.use(express.json());
app.use(
  cors(
    {
      credentials: true,
      origin: '*',
      optionsSuccessStatus: 200,
    }
  )
);

app.use(cookieParser())

app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: false,
    // sameSite: 'none'
  }
  )
)

app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 * 5 },
  abortOnLimit: true,
}))



app.get(`${process.env.BASEPATH}`, (req, res) => res.send('INDEX - AMIBA WEBSERVICES'));

//routes
app.use(`${process.env.BASEPATH}/users`, require('./routes/users'))
app.use(`${process.env.BASEPATH}/organizations`, require('./routes/organizations'))
app.use(`${process.env.BASEPATH}/orders`, require('./routes/orders'))
app.use(`${process.env.BASEPATH}/orderHistory`, require('./routes/orderHistory'))
app.use(`${process.env.BASEPATH}/explorations`, require('./routes/explorations'))
app.use(`${process.env.BASEPATH}/certifications`, require('./routes/certifications'))
app.use(`${process.env.BASEPATH}/products`, require('./routes/products'))
app.use(`${process.env.BASEPATH}/orderLines`, require('./routes/orderLines'))
app.use(`${process.env.BASEPATH}/eggsBatchs`, require('./routes/eggsBatchs'))
app.use(`${process.env.BASEPATH}/animals`, require('./routes/animals'))
app.use(`${process.env.BASEPATH}/animalProducts`, require('./routes/animalProducts'))
app.use(`${process.env.BASEPATH}/eggsBatchProducts`, require('./routes/eggsBatchProducts'))
app.use(`${process.env.BASEPATH}/carts`, require('./routes/carts'))
app.use(`${process.env.BASEPATH}/uploadFiles`, require('./routes/uploadFiles'))
app.use(`${process.env.BASEPATH}/transactions`, require('./routes/transactions'))


app.use(`${process.env.BASEPATH}/devTools`, require('./routes/xDevTools'))

module.exports = app