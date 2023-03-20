const {Schema, model} = require('mongoose');
//bring in uuidv4 for invitation code
const { v4: uuidv4 } = require('uuid');


const garageSchema = new Schema(
    {
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        garageName:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            // unique:true,
        }],
        //auto generated
        invitationCode: {
            type: String,
            unique: true,
            default: () => uuidv4(),
        },
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'Message',
        }],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)


const Garage = model('Garage', garageSchema);

module.exports = Garage;