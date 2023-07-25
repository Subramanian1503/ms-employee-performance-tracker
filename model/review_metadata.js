const mongoose = require("mongoose");

const reviewMetadataSchema = new mongoose.Schema({
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review_period: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    status: {
        type: String,
        enum: ["TODO", "IN_REVIEW", "DONE"],
        default: "TODO",
        required: true,
    },
    review_result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }
}, {
    timestamps: true
});

const reviewMetadataModel = mongoose.model("Review_Metadata", reviewMetadataSchema);

module.exports = reviewMetadataModel;