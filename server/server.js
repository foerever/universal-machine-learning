//create data base
var path = require('path');
var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var models = require('./models.js');
var FoodSubmission = models.FoodSubmission;

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev.js');

mongoose.connect(require('./connection.js'), { useFindAndModify: false });

app.use(express.static('public'));
if (process.env.NODE_ENV === 'development') {
  // Setup Webpack for development
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
} else {
  // Static serve the dist/ folder in production
  app.use(express.static('dist'));
}

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/fnb_submission', (req, res) => {
    let foodSubmission = new FoodSubmission({
        name: req.body.name,
        email: req.body.email,
        foodType: req.body.foodType,
        notes: req.body.notes,
        date: req.body.date
    })
    foodSubmission.save();
    res.status(200).send("Thanks for filling out the food info:)")
})

app.get('/fnb_get', (req, res) => {
    let startOfWeek = new Date(moment().startOf('week').toISOString());
    let endOfWeek = new Date(moment().endOf('week').toISOString());
    FoodSubmission.find({date: {$gte: startOfWeek, $lte: endOfWeek}}, '-_id -__v -updatedAt -createdAt', function (err, doc) {
        res.json(doc ? doc : {});
    })
})

const port = process.env.PORT || 8000;

// // remember to run webpack or this path wont find the files needed for the bundle
// app.use(express.static(path.resolve(__dirname, '../public/')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('404 Error');
    err.status = 404;
    next(err);
});

// server error handle
app.use(function (req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
})

app.listen(port, () => {
    console.log(`server and client are now running on ${port}`);
});