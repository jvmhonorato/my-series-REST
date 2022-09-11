const express = require('express')
const app = express()
const port = 3000



const series = [
    {name: 'Game of Thronnes'},
    {name: 'The Walking dead'}
]

app.get('/series', (req,res) => res.send(series))

app.listen(port, ()=>console.log('listening...'))