require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJWT');
const path = require('path');
const port = process.env.PORT || 3500;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const errorHandler = require('./middleware/errorHandler');

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
// (it will apply to all routs below)
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public'))); // default for /

// routes
app.get('/', (req, res) => res.json({sucess: 'Hello World!'}));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/projects', require('./routes/api/projects'));
app.use('/speedTest', require('./routes/api/testResult'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
    app.listen(port, ()=> console.log(`Server running on port ${port}`))
})


