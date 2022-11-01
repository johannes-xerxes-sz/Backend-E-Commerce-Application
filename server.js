const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const category = require('./routes/category');
const user = require('./routes/user');
const item = require('./routes/item');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

//! To read our config values
dotenv.config({ path: './config/config.env' });

connectDB();

//! initialize our express framework
const app = express(); 
 
//! use the morgan logger for development purposes ONLY
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//parse cookies
app.use(cookieParser());

//file upload middleware
app.use(fileupload());

//sanitize our nosql injections
app.use(mongoSanitize());

//protect from cross site scripting
app.use(xss());

//protect from http parameter pollution
app.use(hpp());

// set up a rate limit for only allowing 100 request/ 10 minj
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
})

app.use(limiter);

// app security headers
app.use(helmet());


//add cors protection
app.use(cors());

//! read/parse json data
app.use(bodyParser.json())

// use our logger
app.use(logger);

//hook up our routes
app.use('/api/v1/category', category);
app.use('/api/v1/item', item);

app.use('/api/v1/user', user);


app.use(errorHandler);

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

// process our error and close off our server
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    // kill server
    server.close(() => process.exit(1))
})

