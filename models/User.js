var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
name:{
	type: string,
	required: true
	},
email:{
        type: string,
        required: true
        },
password:{
        type: string,
        required: true
        },
username:{
        type: string,
        required: false
        },

});

const User = module.exports =mongoose.model('User',UserSchema);
