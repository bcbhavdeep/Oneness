module.exports = function(app,passport) {
	app.get('/login',function(req,res){
		res.render('login',{errors:false});
	});

	app.get('/',function(req,res){
		res.redirect('login');
	});

	app.get('/profile',function(req,res){
		res.render('profile');
	});
	app.post('/login',function(req,res,next){
		console.log(req.body)
		req.checkBody('email','Email is required').notEmpty();
		req.checkBody('password','Password is required').notEmpty();

		var errors = req.validationErrors();
		if(errors){
			res.render('login',{errors:errors});
		}
		else{
				passport.authenticate('local', { successRedirect: '/profile',
																	 failureRedirect: '/login',
																	 failureFlash: true })(req,res,next);
			//	passport.authenticate('local',{
			//		successRedirect: '/profile',
			//		failureRedirect: '/login',
			//		failureFlash: true
			//	});
			//req.flash('success',"sometext");
			res.redirect('profile');
		}
	});

};
