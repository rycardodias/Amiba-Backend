const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

//Database
const db = require('./config/database')

//Test DB
// db.authenticate()
//    .then(()=> console.log('Connection has been established successfully.'))
//    .catch(()=> console.error('Unable to connect to the database:', error))

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('INDEX'));

//users routes
app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port http://127.0.0.1:${PORT}`))
