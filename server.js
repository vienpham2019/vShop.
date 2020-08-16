const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: false}))


const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Listen to PORT ${PORT}`))
