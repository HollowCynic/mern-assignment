import React from 'react';

import updateUser from './api/user/update'
import {useUser} from './context/userContext' 

import Navbar from './navbar.components'



// props = expense

// modal
const UserSettings = () =>{
    const {state, dispatch} = useUser()

    const [newusername, setNewUsername] = React.useState('')
    const [newpassword, setNewPassword] = React.useState(undefined)



    const handleUpdate = async (user) => {
        let updatedUser = {
            username: newusername,
        }
        if(newpassword !== undefined) updatedUser['password'] = newpassword

        await updateUser(state.id, updatedUser).then(updated => {
            dispatch({
                type: "UPDATE_USER",
                payload: updated
            })
        })
    }

    return(
    
    <div>   
        <Navbar/>   
        <h1 className="textborder" style={{color:"white"}}>User Settings : Update User</h1>  

        <hr className="my-4"/>

        <div className="form" style={{width:"80%",margin:"auto"}}>
        <div className="note" style={{paddingTop:"10px"}}>
            <h2 className="textborder" style={{color:"white"}}>Change Username and/or Password:</h2>
        </div>

        <div onSumbit={(e) => handleUpdate(e)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" name="description" placeholder="New Username" value={newusername} onChange={(e) => setNewUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="password" className="form-control" name="amount" placeholder="New Password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)}/>
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

export default UserSettings;