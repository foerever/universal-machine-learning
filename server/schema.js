var mongoose = require('mongoose');

var foodSubmissionSchema = mongoose.Schema({
    name: {type:String, default:""},
    email: {type:String, default:""},
    foodType: {type:String, default:""},
    notes: {type: String, default:""},
    date: {type: Date, default:""}
}, {
    timestamps: true
});

module.exports = {
    foodSubmissionSchema: foodSubmissionSchema,
}