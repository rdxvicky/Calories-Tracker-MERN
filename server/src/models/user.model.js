const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        index: true,
        unique: true,
    },
    userPassword: {
        type: String,
        default: '',
    },
    expectedPerDayIntakeCalorie: {
        type: Number,
        default: 0.0,
    },
    isActive: {
        type: Boolean,
        require: true,
        default: false,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;