const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');

// this is used for loggin, or showing us more information about incoming requests or errors etcs
const morgan = require('morgan');
const app = express();

dotenv.config({path: './config/.env'});
// passport configuratons
// console.log(require);
require('./config/passport')(passport);
// require('./config/passport');

connectDB();


// logging information
if(process.env.NODE_ENV === "development"){
	app.use(morgan('dev'));
}

// handlebars template engine
app.engine('.hbs', exphbs({defaultLayout:'main',  extname:'.hbs'}));
app.set('view engine', '.hbs');

// sessions
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
  }))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// stati folders
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT ;

app.listen(
	PORT, console.log(`running on port ${PORT} in ${process.env.NODE_ENV} mode`)
	)


