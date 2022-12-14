var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },

    lastname: {

        type: String,
        maxlength: 32,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true }

);

module.exports = mongoose.model("User", userSchema);

