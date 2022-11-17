const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const SslServer = https.createServer({
    key:fs.readFileSync(path.join(__dirname,'certificate','key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'certificate','cert.pem'))
},app)

SslServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})