const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    jobKnowledge: {
        type: String,
        required: true
    },
    workQuality: {
        type: String,
        required: true
    },
    productivity: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    consistency: {
        type: String,
        required: true
    },
    attitude: {
        type: String,
        required: true
    },
    attendance: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;