const {Schema, model} = require('mongoose');

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
        checkout: {
            type: Schema.Types.ObjectId,
            ref: 'Checkout',
        },
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Tool = model('Tool', toolSchema);

module.exports = Tool;