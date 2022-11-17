const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Data Structure Of Conference
const MessageSchema = Schema({

    name: {
        type: String,
    },
    username:{
        type: String,
        //required: true
    },
    description:{
        type: String,
    },
    createdAt:{
        type: String,
    },
    type: {
        type: String
    }
});

const messages = mongoose.model('messages', MessageSchema);
module.exports = messages;