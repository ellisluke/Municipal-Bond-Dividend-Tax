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


// Home page
app.get('/', (req, res) => {
    res.render("home", { data: {
      "calculation": false
    }})
})

// Home page AFTER calculation
app.post('/', (req, res) => {
    res.render("home", { data: {
      "calculation": true,
      "nums": calculateSavings(req.body.symbol, req.body.year, req.body.state, req.body.dividends)
    }})
})

// TEST ROUTES

// app.get('/lookup/:year/:symbol', (req, res) => {
//   res.send(searchBonds(req.params.symbol, req.params.year))
// })

// app.get('/lookup/:territory', (req, res) => {
//   res.send(searchTerritories(req.params.territory))
// })

// app.get('/testcalc', (req, res) => {
//   res.send(calculateSavings("FMNDX", 2024, "HI", 7000))
// })

function calculateSavings(bondSymb, year, stateCode, dividend) {
  // gather the desired objects
  const stateData = searchTerritories(stateCode)
  const bondData  = searchBonds(bondSymb, year)
  
  let calcData = []
  let totalPercentage = 0

  // Iterate through the exempt territories for user's location
  for (const exempts of stateData.ExemptTerritories) {
    let percentage = bondData.investment_distribution[exempts]

    // In case the territory doesn't exist in that data, set the percentage to 0
    if (percentage == null) {
      percentage = 0
    } 

    calcData.push([exempts, percentage])
    totalPercentage += percentage
  }

  // Round percentage to nearest ten thousandths place
  totalPercentage = Math.round(totalPercentage * 10000) / 10000

  // round nontaxable dividend earnings DOWN to nearest cent
  const nontax = Math.floor(totalPercentage * dividend * 100) / 100

  // This returned object will fill the ejs template
  return {
    "dividend": dividend,
    "state": stateData.StateName,
    "stateCode": stateData.StateCode,
    "year": year,
    "bondSymb": bondSymb,
    "nonTaxable": nontax,
    "taxable": dividend - nontax, 
    "totalPercent": totalPercentage,
    "calculation": calcData
  }

}

function searchTerritories(code) {
  for (const terr of territoryData) {
    if (terr["StateCode"] === code) {
        return terr
    } 
  }
  return { "message": "no results" }
}

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