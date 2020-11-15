const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')
require('dotenv').config();



const app = express();

app.set('port',process.env.PORT||4000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public/'));

app.use('/api/products',require('./routes/products.routes'));
app.use('/api/users',require('./routes/users.routes'));
app.use('/api/lists',require('./routes/lists.routes'));

module.exports = app;