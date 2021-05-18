const { checkSignIn, checkSignOut } = require('../auth')
const router = require('express').Router();
const { render } = require('@testing-library/react');
const bcrypt = require('bcrypt')
let User = require('../models/user.model');
const { body, validationResult } = require('express-validator')

router.post('/register',
    (req,res) => {
        try{
            const { username, password } = req.body
        
            if(username.length < 5) return res.status(400).send("Username must be longer than 5 characters")
            if(password.length < 5) return res.status(400).send("Password must be longer than 5 characters")
        
            else {
                let user = new User({
                    username: username,
                    password: bcrypt.hashSync(password, 10)
                })
                user.save(err => {
                    if(err){
                        console.error(err)
                        res.status(400).send("Something went wrong")
                    }
                })
                req.session.userID = user.id
                res.status(200).send({
                    id: user.id,
                    username: user.username
                })
            }
        }
        catch(err) {
            res.status(400).send("Error: ", err)
        }
})


router.post('/login', function(req, res, next){
    try{
        var username = req.body.username
        var password = req.body.password
        User.findOne({username:username},function(err,user){
            if(err){
                throw err
            }
            var validUser = false;
            if(user){
                var hash = user.password;
                validUser = bcrypt.compareSync(password,hash)
            }
            if(validUser){
                req.session.userID = user.id
                res.status(200).send({
                    id: user.id,
                    username: user.username
                })
            }
        })
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

router.patch('/update/:id', checkSignIn, function(req,res,next){
    try{
        let updatedInfo = {
            username: req.body.username,
        }
        if(req.body.password) {
            updatedInfo["password"] = bcrypt.hashSync(req.body.password, 10)
        }
    
        User.findOneAndUpdate({ _id: req.session.userID}, { ...updatedInfo })
            .then(updatedUser => {
                res.status(200).send(updatedUser)
            }) .catch(err => res.status(400).send("Error: ", err))
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

router.post('/logout', checkSignOut, function (req, res, next){
    try{
        const {userID} = req.session.userID;
        if(userID) {
            req.session.destroy(() => console.log("User is logged out"))
        }
        res.status(200).send({success: true})
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

module.exports = router;