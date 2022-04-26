const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Types

const roomSchema = new Schema({
    room_name: String,
    users_id: [{
        type: ObjectId,
        ref: 'users'
    }]
})

module.exports = mongoose.model('rooms', roomSchema)