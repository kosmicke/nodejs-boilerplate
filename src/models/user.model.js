var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        login: {
            type: String
        },
        password: {
            type: String
        },
        type : {
            type: String
        },
        status : {
            type: Boolean
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);

module.exports.User = mongoose.model('user', schema, 'users');