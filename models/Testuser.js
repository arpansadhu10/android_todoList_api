const mongoose = require('mongoose');

const testuserSchema = new mongoose.Schema({
    body: String,
    id: Number,
    userId: Number,
    title: String

});

module.exports = mongoose.model('testuser', testuserSchema);