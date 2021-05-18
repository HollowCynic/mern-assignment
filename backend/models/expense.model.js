const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    userID:{type: String, required: true},
    description:{type: String, required: true},
    amount:{type: Number,required: true},
    date:{type: String}
}, {
    timestamps:true
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;