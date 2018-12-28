module.exports = function(app,passport) {
app.get('/login',function(req,res){
res.render('login',{errors:false});
});

app.get('/',function(req,res){
req.flash('success','1 success');
req.flash('success','2 success');
req.flash('danger','1 danger');
req.flash('danger','2 danger');
req.flash('info','1 info');
req.flash('info','2 info');
req.flash('danger','3 danger');
res.render('login',{errors:false});
});

app.post('/login',function(req,res){
console.log(req.body);
req.checkBody('email','Email is required').notEmpty();
req.checkBody('password','Password is required').notEmpty();

var errors = req.validationErrors();
if(errors){
	console.log(errors);
	res.render('login',{errors:errors});
}
else{
//	passport.authenticate('local',{
//		successRedirect: '/profile',
//		failureRedirect: '/login',
//		failureFlash: true
//	});
//req.flash('success',"sometext");
res.render('login');
}
});

};
