const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    receiver_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

    message: {
        type: String,
        required: true
    }

},
    { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);