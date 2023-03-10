const {Schema, model} = require('mongoose');

const User = require('./User');
const Message = require('./Message');

const garageSchema = new Schema(
    {
        admin: {
            type: User,
            required: true
        },
        users: [User],
        invitationCode: {
            type: String,
            required: true,
            unique: true
        },
        messages: [Message]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Garage = model('Garage', garageSchema);

module.exports = Garage;