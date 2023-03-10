const {Schema, model} = require('mongoose');

const messageSchema = new Schema(
    {
        outDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

messageSchema.virtual('overdue').get(function () {
    if(this.dueDate){
        if(Date.now()>this.dueDate){
            return true;
        }
    }
    return false;
})

const Message = model('Message', messageSchema);

module.exports = Message;