const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const databaseURL = 'mongodb://localhost:27017/apartmentdb';


const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false };


var connectio = mongoose.createConnection(databaseURL, options);
autoIncrement.initialize(connectio);
module.exports = mongoose;