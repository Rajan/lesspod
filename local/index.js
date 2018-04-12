const express = require('express')
const Bundler = require('parcel-bundler')
const path = require('path')
const bundler = new Bundler(path.resolve(__dirname, '../login.html'))
const app = express()

const PORT0 = 8080 // process.env.PORT0

app.use(bundler.middleware())

app.get('/ping', (req, res) => {
  res.status(200).send('Ok')
})

app.listen(PORT0, () => {
  console.log(`Service running on ${PORT0}`)
})