const express = require('express');
const helmet = require('helmet')
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const keys = require('./config/keys')
const app = express();

app.use(helmet());

mongoose.connect(keys.mongoURI)
    .then(() => console.log('mongo db connected'))
    .catch(e => console.log(e.message));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

module.exports = app;
