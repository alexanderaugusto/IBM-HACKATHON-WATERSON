require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

const server = app.listen(process.env.PORT || 3333, () => {
  const host = server.address().address
  const port = server.address().port
  console.log(`Waterson api listening at http://${host}:${port}`)
})