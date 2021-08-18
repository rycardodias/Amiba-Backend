const app = require('./app')


const PORT = process.env.PORT //|| 5000;
app.listen(PORT, console.log(`Server started on port http://127.0.0.1:${PORT}`))

