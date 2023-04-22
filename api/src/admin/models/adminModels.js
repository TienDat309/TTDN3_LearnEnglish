const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    fullname : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    role:Number
});
module.exports = mongoose.model('Admins',adminSchema);