const express = require('express')
const cors = require("cors")
const cookieSession = require('cookie-session')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const db = require('./config/database')
dotenv.config()

db.sync({ force: true })

// db.authenticate()
//    .then(()=> console.log('Connection has been established successfully.'))
//    .catch((error)=> console.error('Unable to connect to the database:', error))

const app = express();
app.use(express.json());
app.use(
  cors(
    {
      // credentials: true,
      // origin: 'http://localhost:3000',
      //   optionsSuccessStatus: 200,
    }
  )
);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  }
  )
)

app.use(fileUpload({
  limits: { fileSize: 1024 * 1024 * 5 },
  abortOnLimit: true,
}))



app.get('/', (req, res) => res.send('INDEX - AMIBA WEBSERVICES'));

//routes
app.use('/users', require('./routes/users'))
app.use('/organizations', require('./routes/organizations'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/menus', require('./routes/menus'))
app.use('/orders', require('./routes/orders'))
app.use('/orderHistory', require('./routes/orderHistory'))
app.use('/explorations', require('./routes/explorations'))
app.use('/certifications', require('./routes/certifications'))
app.use('/products', require('./routes/products'))
app.use('/orderLines', require('./routes/orderLines'))
app.use('/eggsBatchs', require('./routes/eggsBatchs'))
app.use('/eggsBatchExplorations', require('./routes/eggsBatchExplorations'))
app.use('/animals', require('./routes/animals'))
app.use('/animalProducts', require('./routes/animalProducts'))
app.use('/eggsBatchProducts', require('./routes/eggsBatchProducts'))
app.use('/carts', require('./routes/carts'))
app.use('/uploadFiles', require('./routes/uploadFiles'))

app.use('/devTools', require('./routes/xDevTools'))

module.exports = app
