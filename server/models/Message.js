const {Schema, model} = require('mongoose');

const User = require('./User');

const messageSchema = new Schema(
    {
        author: {
            type: User,
            required: true
        },
        timeStamp: {
            type: Date
        },
        body: {
            type: String
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Message = model('Message', messageSchema);

module.exports = Message;