const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types


const messageSchema = new Schema({
    content: String,
    user_id: {
        type: ObjectId,
        ref: 'users'
    },
    room_id: {
        type: ObjectId,
        ref: 'rooms'
    },
    time: { 
        type: Date, 
        default: Date.now 
    },
    status : {
        type: String,
        default: 'received',
        enum: ['received','read']
    }
})

module.exports = mongoose.model('messages', messageSchema)