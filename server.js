require('dotenv').config()
const express = require('express')
const pool = require('./db')
const port = process.env.PORT

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send("DId this work?")
})


app.listen(port, () => console.log(`Server is now running on port: ${port}`))