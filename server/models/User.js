const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    image : {type : String , required : true},
    isAdmin : {type : Boolean , required : true},
    created : {type : Date , default : Date.now()}
});
let User = mongoose.model('user', UserSchema);
module.exports = User;
