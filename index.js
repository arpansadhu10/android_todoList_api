const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const { connect } = require('./config/db');
const user = require('./routes/user');

connect()

app.use(
    express.json({})
)
app.use(
    express.json({ extended: true })
)


app.use(morgan('dev'))


app.use('/api/todo', user)




app.get('/', (req, res) => {
    res.send("Helloo")
})

app.listen(3000, () => {
    console.log("servver running");
})
