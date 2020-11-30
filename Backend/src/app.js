const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express();

app.set('port',process.env.PORT||4000);


app.use(cors({origin:["http://localhost:5500","http://127.0.0.1:5500/","*"],exposedHeaders: "auth-token",credentials:true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(__dirname+'/public/'));

app.use('/api/products',require('./routes/products.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/lists',require('./routes/lists.routes'));
// app.use('/api/categories',require('./routes/categories.routes'));
// app.use('/api/listproducts',require('./routes/listProducts.routes'));

module.exports = app;