import React, {useState} from 'react';
import Navbar from "./navbar.components"
import Jumbotron from "./jumbotron.components"
import { Link, Redirect } from "react-router-dom";
import { useUser } from "./context/userContext"
import { useExpense } from "./context/expenseContext"
import getUserExpenses from './api/expense/get_expense'
import deleteExpense from "./api/expense/delete_expense"
import addExpense from './api/expense/add_expense'
import UpdateForm from './updateform.component'
import moment from 'moment'

const Dashboard = () =>{
    const {state, dispatch} = useUser()
    const {expState, expDispatch} = useExpense()
    

    {/*delete functions */}
    const handledelete = async (expenseID) =>{
        await deleteExpense(expenseID)
        .then(expense => {
            expDispatch({
                type:"DELETE_EXPENSE",
                payload: expenseID
            })
        }).catch(err =>console.error(err))
    }
    {/*end of delete functions */}

    {/*Add expense functions */}
    const [description, setDescription] = React.useState('')
    const [amount, setamount] = React.useState('')
    const [date, setdate] = React.useState('')

    const handleSubmit = async(e) => {
        let userID = state.id

        await addExpense({
            userID,
            description,
            amount,
            date
        }).then(expense => {
            expDispatch({
                type: "ADD_EXPENSE",
                payload: {
                    userID,
                    description: expense.description,
                    amount: expense.amount,
                    date: expense.date
                }
            })
        }).catch(err => console.error(err))
    }



    React.useEffect(() => {
        getUserExpenses(state.id).then(expenses => {
            expDispatch({
                type: "SET_EXPENSES",
                payload: expenses
            })
        })
    }, [expState.expenses])

    let expensetotal=0;
    for(const expense of expState.expenses){
        expensetotal = expensetotal + expense.amount
    }
    expensetotal = expensetotal.toFixed(2)

    {/*Toggle update */}
    const[updateExpense, setUpdateExpense] = React.useState({})
    const[visibility, setvisibility] = useState(false)

    const toggleVisibility = (e) => {
        setvisibility(!visibility)
    }

    if(!state.isAuthenticated) {
        return (<Redirect to="/"/>)
    } else {
        return(
            <div style={{width:"100%", margin:"auto"}}>
                <Navbar/>
                <div style={{display:"flex", flexDirection:"row"}}>

                {/*left panel*/} 
                <div className="pane">
                    <h2 className="whiteshadow">Total Expenses: ${expensetotal}</h2>
                    <h2 className="whiteshadow">Expense List:</h2>
                    
                    <div style={{ height:"28em",width:"100%", overflowY:"scroll"}}>
                    <table className="table table-bordered table-dark" style={{width:"100%"}}>
                        <thead className="thead-dark">
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {expState.expenses.map(expense => (
                                    <tr className="hoverable" key={expense._id}>
                                        <td>
                                            {expense.description}
                                        </td>
                                        <td>
                                            ${expense.amount}
                                        </td>
                                        <td>
                                            {new Date(expense.date).toDateString()}
                                        </td>
                                        <td>
                                            <button className="hoverable2" onClick={(e) => handledelete(expense._id)}>X</button>
                                        </td>
                                        <td>
                                            <button 
                                                className="hoverable2" 
                                                onClick={(e) => {
                                                    toggleVisibility(e)
                                                    setUpdateExpense(expense)
                                                }}
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    </div>
                </div>

                {/*right panel*/}
                <div className="pane">
                                        
                    <div className="form" style={{marginTop:"65px"}}>
                    <div className="note" style={{paddingTop:"10px"}}>
                        <h2 className="textborder" style={{color:"white"}}>Add new expense:</h2>
                    </div>

                    <div onSumbit={(e) => handleSubmit(e)}>
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
                        <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                </div>

                <div style={{marginTop:"20px", marginBottom:"20px"}}>
                </div>

                <hr className="my-4"/>
                {!visibility && <h3 style={{color:"white"}}>update</h3>}
                {visibility && <UpdateForm expense={updateExpense}/>}

                <hr className="my-4"/>

                    <div style={{margin:"auto", display:"flex", border:"solid", padding:"10px", marginTop:"30px"}}>
                        <div style={{ width:"50%"}}>
                        <p className="textborder" style={{color:"white", marginBottom:"0px"}}>Income Tax calculator:</p>
                        <a href="https://smartasset.com/taxes/income-taxes#5k4Ko3bC31" target="_blank" rel="noopener noreferrer">
                            <img src="https://dr5dymrsxhdzh.cloudfront.net/files/b4f2b4a6//images/base/sa_logo_nav._225x52.png"/>
                        </a>
                        </div>
                        
                        <div style={{width:"40%", alignContent:"center"}}>
                        <p className="textborder" style={{color:"white", marginBottom:"0px"}}>Money Management Tips:</p>
                        <a href="https://www.thebalance.com/ways-to-be-better-with-money-960664" target="_blank" rel="noopener noreferrer">
                            <img src="https://pbs.twimg.com/profile_images/966002100810461185/49TE2F8a.jpg" style={{ width:"100px", height:"auto" }}/>
                        </a>
                        </div>
                    </div>





                </div>
                </div>
            </div>
        )
    }
}

export default Dashboard