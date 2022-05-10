const express = require('express')
const app = express()
require('dotenv').config();
const connect = require("./config/db");


const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// DataBase Connection
connect();


const userRoutes = require("./routes/userRoutes")
const postRoutes = require('./routes/postRoutes');

app.use('/api', postRoutes);
app.use('/api', userRoutes);


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${(port)}`)
})