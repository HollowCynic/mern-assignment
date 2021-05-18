import React from 'react';

import UpdateUserExpense from './api/expense/update_expense'
import {useExpense} from './context/expenseContext'

// props = expense

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// modal
const UpdateForm = ({expense}) =>{
    const {expState, expDispatch} = useExpense()
    const [description, setDescription] = React.useState(expense.description)
    const [amount, setamount] = React.useState(expense.amount)
    const [date, setdate] = React.useState(formatDate(new Date(expense.date)))


    //handleSubmit
    const handleUpdate = async () => {
        const updateData = {
            description,
            amount,
            date
        }
        
        await UpdateUserExpense(expense._id, updateData).then(updated => {
            expDispatch({
                type: "UPDATE_EXPENSE",
                payload: updated
            })
        })
    }

    return(
    <div>                                
        <div className="form" style={{marginTop:"0px"}}>
        <div className="note" style={{paddingTop:"10px"}}>
            <h2 className="textborder" style={{color:"white"}}>Update expense:</h2>
        </div>

        <div onSumbit={(e) => handleUpdate(e)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" name="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="number" className="form-control" name="amount" placeholder="Amount ex: 3.50" value={amount} onChange={(e) => setamount(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="date" className="form-control" name="amount" placeholder="Amount" value={date} onChange={(e) => setdate(e.target.value)}/>
                    </div>
                </div>  
            </div>
            <br/>
            <button onClick={(e) => handleUpdate(e)}>Submit</button>
        </div>
        </div>
    </div>   
    )  
}

export default UpdateForm;