const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true

    },

    userId: {
        type: String,
    },

    productCode: {
        type: Number,
    },

    file: {
        type: String,
    }


}, { timestamps: true }

);

module.exports = mongoose.model("FileS", fileSchema);
