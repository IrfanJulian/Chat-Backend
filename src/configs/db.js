/* eslint-disable no-undef */
require('dotenv').config()
const {Pool} = require('pg')
const pool = new Pool({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    user: process.env.PGUSER
});
module.exports = pool