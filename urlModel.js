const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
})

const urlModel = mongoose.model('URL', urlSchema);

module.exports = urlModel;