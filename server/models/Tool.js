const {Schema, model} = require('mongoose');


//checkout lives in the tool
// const checkoutSchema = new Schema(
//     {
//         outDate: {
//             type: Date,
//             required: true
//         },
//         dueDate: {
//             type: Date
//         }
//     },
//     {
//         toJSON: {
//             virtuals: true
//         }
//     }
// );

// checkoutSchema.virtual('overdue').get(function () {
//     if(this.dueDate){
//         if(Date.now()>this.dueDate){
//             return true;
//         }
//     }
//     return false;
// });



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