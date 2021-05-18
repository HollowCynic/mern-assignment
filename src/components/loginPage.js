import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

import Navbar from "./navbar.components"
import Jumbotron2 from "./jumbotron2.components"

import login from './api/user/login'
import { useUser } from './context/userContext'


const LoginPage = () =>{
    const {state, dispatch} = useUser()

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')


    const handleSubmit = async (e) => {
        await login({
            username,
            password
        }).then(user => {
            dispatch({
                type: "LOGIN_SUCCESS",
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
            <div style={{margin:"auto"}}>    
                <Navbar/>
                <Jumbotron2 header="Login" description="Login to your account with your username and passord"/>

                {/*
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                */}
                
                <div style={{margin:"30px", height:"250px", border:"solid", borderColor:"black", color:"white"}}>
                <div className="container register-form" style={{margin:"auto", MarginBottom:"30px"}}>
                <div className="form">
                    <div className="note" style={{paddingTop:"40px"}}>
                        <h2 className="textborder">Login to your account</h2>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
    
}

export default LoginPage