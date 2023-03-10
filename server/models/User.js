const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcrypt');

//bring in the other models needed for User
const Tool = require('./Tool');
const Garage = require('./Garage');
const Checkout = require('./Checkout')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    ownedTools: [{
        type: Schema.Types.ObjectId,
        ref: 'Tool'
    }],
    address: {
        type: String,
    }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;