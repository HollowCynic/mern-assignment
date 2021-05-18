const router = require('express').Router();
let Expense = require('../models/expense.model');
const {checkSignIn, checkSignOut} = require('../auth')


router.get('/', checkSignIn, (req,res) => {
    try{
        Expense.find()
            .then(expenses => res.json(expenses))
            .catch(err => res.status(400).json('Error: ' + err))
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

router.get('/:id', checkSignIn, (req, res) => {
    try{
        Expense.find({ userID: req.params.id }).then(expenses => {
            res.status(200).send(expenses)
        }).catch(err => res.status(400).send('Error' + err))
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

router.post('/add', checkSignIn, (req,res) => {
    try{
        const {userID, description, amount, date} = req.body;
    
        const newExpense = new Expense({
            userID,
            description,
            amount,
            date
        }).save()
            .then(() => res.status(200).send(newExpense))
            .catch(err => res.status(400).json('Error: ' + err))
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

router.patch('/update/:id', checkSignIn, (req, res) => {
    try{
        Expense.findOneAndUpdate({ _id: req.params.id}, {...req.body}).then(async updatedExpense => {
            res.status(200).send(updatedExpense)
        }).catch(err => res.status(400).json('Error: ' + err))
    } catch(err) {
        res.status(400).json('Error: ' + err)
    }
})

router.delete('/:id', checkSignIn, (req, res) => {
    try{
        Expense.findOneAndRemove({ _id: req.params.id })
            .then(() => res.status(200).send({success: true}))
            .catch(err => res.status(400).send({success: false}))
    }
    catch(err) {
        res.status(400).send("Error: ", err)
    }
})

module.exports = router;