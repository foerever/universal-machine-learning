const tf = require('@tensorflow/tfjs-node');
const argparse = require('argparse');
const https = require('https');
const fs = require('fs');
const createModel = require('./model');
const createDataset = require('./data');


const csvUrl =
    'https://storage.googleapis.com/tfjs-examples/abalone-node/abalone.csv';
const csvPath = './abalone.csv';

/**
 * Train a model with dataset, then save the model to a local folder.
 */
async function train(epochs, batchSize, savePath) {
    const datasetObj = await createDataset('file://' + csvPath);
    const model = createModel([datasetObj.numOfColumns]);
    // The dataset has 4177 rows. Split them into 2 groups, one for training and
    // one for validation. Take about 3500 rows as train dataset, and the rest as
    // validation dataset.
    const trainBatches = Math.floor(3500 / batchSize);
    const dataset = datasetObj.dataset.shuffle(1000).batch(batchSize);
    const trainDataset = dataset.take(trainBatches);
    const validationDataset = dataset.skip(trainBatches);
    await model.save(savePath);
    const loadedModel = await tf.loadLayersModel(savePath + '/model.json');
    loadedModel.compile({optimizer: tf.train.sgd(0.01), loss: 'meanSquaredError'});


    await loadedModel.fitDataset(
        trainDataset, {epochs: 2, validationData: validationDataset});

    const result = loadedModel.predict(
        tf.tensor2d([[0, 0.625, 0.495, 0.165, 1.262, 0.507, 0.318, 0.39]]));
    console.log(
        'The actual test abalone age is 10, the inference result from the model is ' +
        result.dataSync());
}

const parser = new argparse.ArgumentParser(
    {description: 'TensorFlow.js-Node Abalone Example.', addHelp: true});
parser.addArgument('--epochs', {
    type: 'int',
    defaultValue: 100,
    help: 'Number of epochs to train the model for.'
});
parser.addArgument('--batch_size', {
    type: 'int',
    defaultValue: 500,
    help: 'Batch size to be used during model training.'
})
parser.addArgument(
    '--savePath',
    {type: 'string', defaultValue: 'file://trainedModel', help: 'Path.'})
const args = parser.parseArgs();


const file = fs.createWriteStream(csvPath);
https.get(csvUrl, function(response) {
    response.pipe(file).on('close', async () => {
        train(args.epochs, args.batch_size, args.savePath);
    });
});

module.exports = train;