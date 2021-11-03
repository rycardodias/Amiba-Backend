const express = require('express')
const cors = require("cors")
const cookieSession = require('cookie-session')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(express.json());
app.use(
  cors(
    // {
    //   origin: 'http://localhost:3000',
    //   optionsSuccessStatus: 200,
    // }
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
app.use('/organizationTypes', require('./routes/organizationTypes'))
app.use('/organizations', require('./routes/organizations'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/menus', require('./routes/menus'))
app.use('/orders', require('./routes/orders'))
app.use('/orderHistory', require('./routes/orderHistory'))
app.use('/explorationTypes', require('./routes/explorationTypes'))
app.use('/explorations', require('./routes/explorations'))
app.use('/certifications', require('./routes/certifications'))
app.use('/productTypes', require('./routes/productTypes'))
app.use('/products', require('./routes/products'))
app.use('/orderLines', require('./routes/orderLines'))
app.use('/races', require('./routes/races'))
app.use('/eggsBatchs', require('./routes/eggsBatchs'))
app.use('/eggsBatchExplorations', require('./routes/eggsBatchExplorations'))
app.use('/animals', require('./routes/animals'))
app.use('/animalProducts', require('./routes/animalProducts'))
app.use('/eggsBatchProducts', require('./routes/eggsBatchProducts'))
app.use('/carts', require('./routes/carts'))
app.use('/uploadFiles', require('./routes/uploadFiles'))

app.use('/devTools', require('./routes/xDevTools'))

module.exports = app
