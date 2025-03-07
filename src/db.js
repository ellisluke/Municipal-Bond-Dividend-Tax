const { Pool } = require('pg')
const pool = new Pool({
    host: 'db',
    port: '5432',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME
})

module.exports = pool