const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: false}))

// data base 
mongoose.connect(process.env.MONGOOSE_URI , {useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true})

mongoose.connection.once('open' , () => console.log('Connect to database ....'))


const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Listen to PORT ${PORT}`))
