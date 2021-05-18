import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom";
import {useUser} from "./context/userContext"
import logout from './api/user/logout'


const Navbar = () => {
    const {state, dispatch} = useUser()

    const handleLogout = async () => {
        await logout().then(success => {
            dispatch({
                type:"LOGOUT_SUCCESS"
            })
        })
    }
    
        return(
            <nav className="navbar sticky-top" style={{
                background: "#000000",
                background: "-webkit-linear-gradient(to right, #434343, #000000)",
                background: "linear-gradient(to right, #434343, #000000)"}}>
                <a className="navbar-brand" href="/" style={{color:"white", margin:"8px"}}>MERN Project</a>

                
                <ul className="nav navbar-right" style={{margin:"8px"}}>
                    {state.isAuthenticated ? 
                    <div className="d-flex flex-row">
                        <h3 style={{color:"white", fontSize:"20px", display: 'flex', alignContent: 'center', marginRight:"15px",
                        marginTop:"7px"}}>Logged in as: {state.username}</h3>
                        <li style={{marginRight:"5px"}}><Link to="/Dashboard" className="nav-link" style={{color:"white"}}>Dashboard</Link></li>
                        <li style={{marginRight:"15px"}}><Link to="/UserSettings" className="nav-link" style={{color:"white"}}>User Settings</Link></li>
                        <button className="logoutButton" onClick={(e) => handleLogout(e)}>Logout</button>
                    </div>
                    : 
                    <div className='d-flex flex-row'>
                        <li><Link to="/login" className="nav-link" style={{color:"white"}}>Login</Link></li>
                        <li><Link to="/register" className="nav-link" style={{color:"white"}}>Register</Link></li>
                    </div>
                    }
                </ul>

            </nav>
        )
    
    
}

const navstyle ={
    background: "#000000",  /* fallback for old browsers */
    background: "-webkit-linear-gradient(to right, #434343, #000000)",  /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, #434343, #000000)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

export default Navbar