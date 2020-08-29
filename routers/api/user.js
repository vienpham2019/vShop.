const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv/config')
const User = require('../../models/user.model')

router.post('/register', (req , res) => {
    let { email } = req.body 
    User.findOne({email})
    .then(userData => {
        if(userData){
            res.json({error: `Email '${email}' is already taken.`})
        }else{
            let newUser = new User({...req.body})
            bcrypt.genSalt( 10 , (err , salt) => 
                bcrypt.hash(newUser.password, salt , (err , hash) => {
                    if(err) throw err 
                    newUser.password = hash
                    newUser.save()
                    .then(_ => {
                        res.json({msg: "Register successful."})
                    })
                    .catch(err => console.log(err))
                })
            )
        }
    })
})

router.post('/login' , (req , res) => {
    let { email , password } = req.body 
    User.findOne({email})
    .then(user => {
        if(!user){ 
            res.json({error: 'Invalid email or password.'})
        }else{
            bcrypt.compare(password , user.password , (error , isMatch) => {
                if(error) throw error 

                if(isMatch){
                    let token = jwt.sign({id: user.id} , process.env.jwt_key , {algorithm: "HS256"})
                    let { first_name , last_name , email , addresses , orders , widhlist , gender } = user 
                    res.json({user: { first_name , last_name , email , addresses , orders , widhlist , gender , token} })
                }else{
                    res.json({error: 'Invalid email or password.'})
                }
            })
        }
    })
})

module.exports = router