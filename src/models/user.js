const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    account: String,
    password: String,
    onl_status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    role: { 
        type: String, 
        default: 'user',
        enum: ['user', 'admin']
    },
})

module.exports = mongoose.model('users', userSchema)