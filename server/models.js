var mongoose = require('mongoose');
var schema = require('./schema');

module.exports = {
    FoodSubmission: mongoose.model('FoodSubmission', schema.foodSubmissionSchema),
}