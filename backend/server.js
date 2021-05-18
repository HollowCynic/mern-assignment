const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session")
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

const PUBLIC_PATH = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://mern-app-nateb.herokuapp.com/"
// const PUBLIC_PATH = "https://mern-app-nateb.herokuapp.com/"

// setup cookies
const ttl = 7200000
const corsOptions = cors({
    credentials: true,
    origin: PUBLIC_PATH,
    maxAge: ttl
})
const cookieConfig = {
    maxAge: ttl,
    sameSite: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
}

app.use(corsOptions);
app.use(cookieParser())
app.use(session({
    name: "sessid",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    secret: process.env.NODE_ENV === 'development' ? 'cookieSecret' : 'a9uhyfg-978q3hgf897hnqm9078-vghqenw0-987gvny',
    cookie: cookieConfig,
}))
app.options(PUBLIC_PATH, corsOptions)

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected to MongoDB database successfully")
})

const expensesRouter = require('./routes/expenses')
const usersRouter = require('./routes/users')

app.use('/expenses', expensesRouter);
app.use('/users', usersRouter);

app.use(express.static(path.resolve(__dirname, "../build")))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../ build/index.html'))
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`) /*console.log not needed*/
});