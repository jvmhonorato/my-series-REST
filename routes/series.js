
const express = require('express')
const router = express.Router()
const Serie = require('../models/serie')

const series = [
    {name: 'Game of Thronnes'},
    {name: 'The Walking dead'}
]



//default
router.get('/', async(req, res)=> {
    const series = await  Serie.find({})
    res.send(series)
})

//send the series dynamically by default
router.get( '/:id', (req, res)=> {
    res.send(req.params.id)
})


module.exports  = router