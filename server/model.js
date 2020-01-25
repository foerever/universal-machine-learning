const tf = require('@tensorflow/tfjs-node');

/**
 * Builds and returns Multi Layer Perceptron Regression Model.
 *
 * @param {number} inputShape The input shape of the model.
 * @returns {tf.Sequential} The multi layer perceptron regression mode  l.
 */
function createModel(inputShape, num_layers, activation_arr, units_arr) {
    const model = tf.sequential();
    model.add(tf.layers.dense({
        inputShape: inputShape,
        activation: activation_arr[0],
        units: units_arr[0],
    }));

    for (i = 1; i < num_layers; i++) {
        model.add(tf.layers.dense({
            activation: activation_arr[i],
            units: units_arr[i],
        }));
    }

    model.add(tf.layers.dense({
        units: units_arr[units_arr.length - 1],
    }));
    return model;
}

module.exports = createModel;