import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

import Navbar from "./navbar.components"
import Jumbotron2 from "./jumbotron2.components"

import register from './api/user/register'
import { useUser } from './context/userContext'

const RegisterPage = () => {
    const {state, dispatch} = useUser()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleSubmit = async (e) => {
        await register({
            username,
            password
        }).then(user => {
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: {
                    id: user.id,
                    username: user.username
                }
            })
        }).catch(err => console.error(err))

    }

    if(state.isAuthenticated) {
        return (<Redirect to='/dashboard' />)
    } else {
        return(
        <div style={{width:"100%", margin:"auto"}}>
            
            <Navbar/>
            <Jumbotron2 header="Register" description="Register your account"/>
    
            {/*
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            */}
            <div className="container register-form" style={{border:"solid", width:"100%", paddingTop:"25px", paddingBottom:"10px"}}>
            <div className="form">
                {/*}
                <div className="note">
                    <p>Register your account</p>
                 </div>*/}
    
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                            </div>
                            
                            {/* <div className="form-group">
                                <input type="text" className="form-control" placeholder="Confirm Password *"/>
                            </div> */}
                            
                        </div>
                    </div>
                    <br/>
                    <button onClick={(e) => handleSubmit(e)} /*className="btnSubmit"*/ >Submit</button>
                </div>
                </div>
                <div style={{paddingTop:"15px"}}>
                <h2 className="textborder" style={{color:"white"}}>Already have an account?</h2>
                <a className="btn btn-primary btn-lg" href="/login" role="button" style={{marginBottom:"10px"}}>Log In</a>
                </div>


    
            </div>

        </div>
        )
    }

    
}

export default RegisterPage