const {Schema, model} = require('mongoose');

const checkoutSchema = new Schema(
    {
        outDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date
        },
        approved: {
            type: Boolean
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

checkoutSchema.virtual('overdue').get(function () {
    if(this.dueDate){
        if(Date.now()>this.dueDate){
            return true;
        }
    }
    return false;
})

const Checkout = model('Checkout', checkoutSchema);

module.exports = Checkout;