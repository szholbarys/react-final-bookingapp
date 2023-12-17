const mongoose = require('mongoose');
const {Schema} =  mongoose;

const UserShema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const UserModel = mongoose.model('User',UserShema);

module.exports = UserModel;