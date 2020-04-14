const mongoose = require('mongoose');
const envConfig = require('./env');

const startConnection = () => {
    mongoose.Promise = require('bluebird');
    mongoose.set('debug', envConfig.mongo.debug);
    mongoose.connect(envConfig.mongo.uri, envConfig.mongo.options)
    .then(
        db => console.log('MongoDB successfully connected'),
        err => console.log('Error while connecting to MongoDB: ', err)
    );
}

module.exports = {
    startConnection
};


