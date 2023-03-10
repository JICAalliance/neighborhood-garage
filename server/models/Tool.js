const {Schema, model} = require('mongoose');

const Checkout = require('./Checkout');

const toolSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        checkout: Checkout
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Tool = model('Tool', toolSchema);

module.exports = Tool;