const express = require('express')
const app = express()
const port = process.env.MONGO || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/my-series-rest'
const mongoose = require('mongoose')
const series = require('./routes/series')
const bodyParser = require('body-parser')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const jwtSecret = 'ab224ccbacbacbcb3c24bb'
mongoose.Promise = global.Promise

//LET THE CONTENT FROM SERIES INTO THE ROUTE "/series"
app.use('/series', series)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())





// GRAB THE ROUTE /series AND SEND THROUGH CALLBACK 
app.get('/series', (req,res) => res.send(series))

app.post('/auth', async(req, res)=> {
    const user = req.body
    const userDB = await User.findOne({ username: user.username})
    if(userDB){
        if(userDB.password === user.password){
            const payload = {
                id: userDB._id,
                username: userDB.username,
                roles: userDB.roles
            }
            jwt.sign(payload, jwtSecret, (err, token) => {
                res.send({
                    success: true,
                    token: token
                })
            })
         
        }else{
            res.send({success: false, message: 'Wrong credentials'})
        }
    }else{
        res.send({success: false, message: 'Wrong credentials'})
    }
    
})
// app.post('/auth', async(req, res)=> {
//     const user = req.body
//     res.send(user)
// })


const createInitialUsers = async()=> {
    const total = await  User.count({})
    if(total === 0){
        const user = new User({
        username: "Joao",
        password: "123456",
        roles: ['restrito', 'admin']
    })
    await user.save()

    const user2 = new User({
        username: 'restrito',
        password: '123456',
        roles: ['restrito']
    })
    await user2.save()
    }
}


//  CONNECT SEVER THROUGH THE MONGOOSE
mongoose
.connect(mongo,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    createInitialUsers()
    app.listen(port, ()=>console.log('listening...'))
}).catch(e => console.log(e))

