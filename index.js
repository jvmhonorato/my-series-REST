const express = require('express')
const app = express()
const port = process.env.MONGO || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/my-series-rest'
const mongoose = require('mongoose')
const series = require('./routes/series')
const bodyParser = require('body-parser')
mongoose.Promise = global.Promise

//LET THE CONTENT FROM SERIES INTO THE ROUTE "/series"
app.use('/series', series)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())




// GRAB THE ROUTE /series AND SEND THROUGH CALLBACK 
app.get('/series', (req,res) => res.send(series))


//  CONNECT SEVER THROUGH THE MONGOOSE
mongoose
.connect(mongo,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    app.listen(port, ()=>console.log('listening...'))
}).catch(e => console.log(e))

