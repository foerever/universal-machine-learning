const tf = require('@tensorflow/tfjs-node');

/**
 * Builds and returns Multi Layer Perceptron Regression Model.
 *
 * @param {number} inputShape The input shape of the model.
 * @returns {tf.Sequential} The multi layer perceptron regression mode  l.
 */
function createModel(inputShape) {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: inputShape,
        activation: 'sigmoid',
        units: 50,
    }));
    model.add(tf.layers.dense({
        activation: 'sigmoid',
        units: 50,
    }));
    model.add(tf.layers.dense({
        units: 1,
    }));
    return model;
}

module.exports = createModel;