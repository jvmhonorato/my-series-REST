/*
GET /users
*/
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const jwtSecret = 'ab224ccbacbacbcb3c24bb'



const jsonParser = bodyParser.json()



//CONTROLLERS
router.use(async(req, res, next)=> {
    console.log(req)
    const token = req.headers['x-access-token'] || req.body.token || req.query.token
    if(token){
        try{
            const payload = jwt.verify(token, jwtSecret)
            if(payload.roles.indexOf('admin')>=0){
                next()
            }else{
               res.send({ success: false }) 
            }
            
        }catch(e){
           res.send({success: false}) 
        }
       
    }else{
        res.send({success: false})
    }
})
//default
router.get('/', async(req, res)=> {
    const users = await  User.find({})
    res.send(users)
})

module.exports = router