const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');

// this is used for loggin, or showing us more information about incoming requests or errors etcs
const morgan = require('morgan');


dotenv.config({path: './config/config.env'});
connectDB();
const app = express();

// logging information
if(process.env.NODE_ENV === "development"){
	app.use(morgan('dev'));
}

// handlebars template engine
app.engine('.hbs', exphbs({defaultLayout:'main',  extname:'.hbs'}));
app.set('vew engine', '.hbs');

const PORT = process.env.PORT ;

app.listen(
	PORT, console.log(`running on port ${PORT} in ${process.env.NODE_ENV} mode`)
	)


