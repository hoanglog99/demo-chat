const mongoose = require('mongoose');
const Schema = mongoose.Schema

exports.connectDB = async () => {
    try{ 
        await mongoose.connect('mongodb://localhost:27017/chat-demo')
        console.log("connect success!");
    }
    catch(err){
        console.log("connect false!");
    }
}



