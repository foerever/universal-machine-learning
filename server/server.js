require('@tensorflow/tfjs-node');

// const http = require('http');
// const socketio = require('socket.io');
const pitch_type = require('./pitch_type');
const train = require('./train')

const TIMEOUT_BETWEEN_EPOCHS_MS = 500;
const PORT = 8000;

var express = require('express');
var app = express();
const cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.dev.js');

var multer  = require('multer')
var upload = multer({ dest: './tmp' })
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './tmp/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
   
// var upload = multer({ storage: storage })

const port = process.env.PORT || PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
    // Setup Webpack for development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler));
} else {
    // Static serve the dist/ folder in production
    app.use(express.static('dist'));
}

// // remember to run webpack or this path wont find the files needed for the bundle
app.use(express.static(path.resolve(__dirname, '../public/')))

app.post('/submit', upload.fields([{name: 'dataset', maxCount: 1},
                                    {name: 'modeljson', maxCount: 1},
                                    {name: 'weights', maxCount: 1}
                                ]), function (req, res, next) {
    console.log("im in the submit request")
    console.log(req.files.dataset === null ? "null" : "not null");
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})
 
server.listen(port, () => {
    console.log(`  > Running socket on port: ${port}`);
});

// util function to sleep for a given ms
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Main function to start server, perform model training, and emit stats via the socket connection
async function run() {

    io.on('connection', (socket) => {
        socket.on('predictSample', async (sample) => {
            io.emit('predictResult', await pitch_type.predictSample(sample));
        });
    });

    let numTrainingIterations = 1;
    for (var i = 0; i < numTrainingIterations; i++) {
        console.log(`Training iteration : ${i+1} / ${numTrainingIterations}`);
        await pitch_type.model.fitDataset(pitch_type.trainingData, {epochs: 1});
        console.log('accuracyPerClass', await pitch_type.evaluate(true));
        await sleep(TIMEOUT_BETWEEN_EPOCHS_MS);
    }

    io.emit('trainingComplete', true);
}

run();




// //create data base
// var path = require('path');
// var express = require('express');
// var moment = require('moment');
// var bodyParser = require('body-parser');
// var app = express();
// var mongoose = require('mongoose');
// var models = require('./models.js');
// var FoodSubmission = models.FoodSubmission;

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('../webpack.dev.js');

// mongoose.connect(require('./connection.js'), { useFindAndModify: false });

// app.use(express.static('public'));
// if (process.env.NODE_ENV === 'development') {
//   // Setup Webpack for development
//   const compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler));
// } else {
//   // Static serve the dist/ folder in production
//   app.use(express.static('dist'));
// }

// // app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.post('/fnb_submission', (req, res) => {
//     let foodSubmission = new FoodSubmission({
//         name: req.body.name,
//         email: req.body.email,
//         foodType: req.body.foodType,
//         notes: req.body.notes,
//         date: req.body.date
//     })
//     foodSubmission.save();
//     res.status(200).send("Thanks for filling out the food info:)")
// })

// app.get('/fnb_get', (req, res) => {
//     let startOfWeek = new Date(moment().startOf('week').toISOString());
//     let endOfWeek = new Date(moment().endOf('week').toISOString());
//     FoodSubmission.find({date: {$gte: startOfWeek, $lte: endOfWeek}}, '-_id -__v -updatedAt -createdAt', function (err, doc) {
//         res.json(doc ? doc : {});
//     })
// })

// const port = process.env.PORT || 8000;

// // // remember to run webpack or this path wont find the files needed for the bundle
// // app.use(express.static(path.resolve(__dirname, '../public/')))

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     let err = new Error('404 Error');
//     err.status = 404;
//     next(err);
// });

// // server error handle
// app.use(function (req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// })

// app.listen(port, () => {
//     console.log(`server and client are now running on ${port}`);
// });