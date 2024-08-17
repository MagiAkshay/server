const mongoose = require("mongoose");

const userDataSchmema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required:true
    }
});
const UsersData = mongoose.model('Userdata', userDataSchmema);
module.exports = UsersData;
