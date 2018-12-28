const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
	//Local Strategy
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},function(email,password,done){
		//Match Username
		let query = {email:email};
		User.findOne(query, function(err,user){
			if(err) {
				console.log('heheheheheh');
				throw err;}
			if(!user){
				console.log('no user found');
				return done(null, false, {message: 'User Not Found'});
			}
			if(password==user.password){
				console.log('user found passwor match');
				return done(null,user);
			}
			else {
				console.log('wrong passwdd');
				return done(null,false,{message: 'Wrong Password'});
			}

		/*	bcrypt.compare(password,user.password, function(err,isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null,user);
				} else {
					return done(null,false, {message: 'Wrong Password'});
				}
			});*/
		});
	}));
		passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
}
