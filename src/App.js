import React from 'react'
import { BrowserRouter as Router, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.components"
import Jumbotron from "./components/jumbotron.components"

import Home from "./components/home"
import registerPage from './components/registerPage'
import LoginPage from './components/loginPage'
import Dashboard from "./components/dashboard"
import UserSettings from './components/usersettings'

import { UserProvider } from './components/context/userContext'
import { ExpenseProvider } from './components/context/expenseContext'

import "./App.css"

function App() {
  // state = { username, id, isLoggedIn }
  // setState (set username, id)
  return (
    <UserProvider>
      <ExpenseProvider>
      <Router>
        {/* {isLoggedIn ? <div><h1>is Logged in </h1></div> : <div><h1>is not Logged in </h1></div> } */}
              {/*
        <Navbar/>
        <Jumbotron/>*/}
        
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" exact component={registerPage}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/UserSettings" exact component={UserSettings}/>
      </Router>
      </ExpenseProvider>
    </UserProvider>
  );
}

export default App;
