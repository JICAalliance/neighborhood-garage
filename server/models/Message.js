const {Schema, model} = require('mongoose');

const messageSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
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
);

const Message = model('Message', messageSchema);

module.exports = Message;