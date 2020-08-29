const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv/config')
const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended: false}))

// data base 
mongoose.connect(process.env.MONGOODB_URI , {useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true})
mongoose.connection.once('open' , () => console.log('Connect to database ....'))

// routers 
app.use('/api/menCatalog' , require('./routers/api/menCatalog'))
app.use('/api/womenCatalog' , require('./routers/api/womenCatalog'))
app.use('/api/user' , require('./routers/api/user'))

// Serve static assets if in production 
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static('client/build'))

    app.get('*' , (req,res) => {
        res.sendFile(path.join(__dirname + 'client/build/index.html'))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`Listen to PORT ${PORT}`))
