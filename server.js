require('dotenv').config()
const express = require('express')
const pool = require('./db')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.set('view engine', 'ejs')
app.set('views', './views')

// Pull the data from json files first
const bondData = readData("bond-data.json")
const territoryData = readData("exempt-territories.json")

// build SQL tables

app.get('/', (req, res) => {
    res.render("home", {})
})

app.get('/lookup/:year/:symbol', (req, res) => {
    res.send(searchBonds(req.params.symbol, req.params.year))
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send(req.body.state)
})

function searchBonds(symb, yr) {
    for (const bond of bondData) {
        if (bond["symbol"] === symb && bond["year"] == yr) {
            return bond
        } 
    }
    return { "message": "no results" }
}


function readData(filename) {
    const filePath = path.join(__dirname, 'data', `${filename}`)
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(data);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.error(`File not found: ${filename}.json`)
          return null
        } else if (err instanceof SyntaxError){
          console.error(`Invalid JSON format in file: ${filename}.json`)
          return null
        } else {
          console.error(`Error reading or parsing ${filename}.json:`, err)
          return null
        }
      }
}


app.listen(port, () => console.log(`Server is now running on port: ${port}`))