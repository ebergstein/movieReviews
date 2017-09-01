var mongoose = require('mongoose');
var User = mongoose.model('User')
var Review = mongoose.model('Review')
/*module.exports = app => {
	app.post('/login', controller.loginReg);
	app.get('/logout', controller.logout);
	app.get('/current', controller.current);
	app.get('/reviews', controller.getReviews);
	app.post('/reviews', controller.addReview);
	app.get('/user/:id', controller.getUser);
	app.post('/movie/:name', controller.getMovieReviews);
}*/
module.exports = {

	loginReg: (req, res) => {
		console.log("in");
		User.findOne({name: req.body.name}, (err, user) =>{
			if(user == null){
				console.log("new");
				let newUser = new User(req.body);
				newUser.save( (err, savedUser) => {
					console.log("save");
					console.log(err);
					if(err){
						console.log("bad");
						console.log(err);
						let errors = "";
						for (let i in err.errors){
							errors+=err.errors[i].message + ",";
						}
						return res.status(500).send(errors)
					}
					else{
						req.session.user = savedUser;
						console.log(savedUser);
						return res.json(savedUser);
					}
				})
			}
			else{
				console.log("old");
				req.session.user = user;
				console.log(user);
				return res.json(user);
			}
		})
	},
	
	logout: (req, res) => {
		req.session.destroy();
		res.redirect('/');
	},
	
	current: (req, res) => {
		if(!req.session.user){
			return res.status(401).send("Nice try!");
		}
		else{
			return res.json(req.session.user);
		}
	},
	
	addReview: (req, res) => {
		console.log("*********");
		Review.findOne({_id: req.body.id}, (err, product) => {
			console.log("*********");
			if(product != null){
				return res.status(500).send("Review already made")
			}
			var newReview = new Review(req.body);
			newReview._user = req.session.user._id;
			newReview.save( (err, savedReview) => {
				if(err){
					console.log("Saving Reviews");
					console.log(err)
					let errors = "";
					for (let i in err.errors){
						errors+=err.errors[i].message + ",";
					}
					return res.status(500).send(errors)
				}
				else{
					console.log("*********");
					//var temp = req.session.user;
					User.findOne({_id: req.session.user._id}).populate('_reviews').exec( (err, user)=>{
						if(err){
							console.log(err);
							let errors = "";
							for (let i in err.errors){
								errors+=err.errors[i].message + ",";
							}
							return res.status(500).send(errors)
						}
						else{
							console.log(user);
							user._reviews.push(savedReview._id);
							user.save( (err, savedUser) => {
								console.log("save");
								console.log(err);
								if(err){
									console.log("bad");
									console.log(err);
									let errors = "";
									for (let i in err.errors){
										errors+=err.errors[i].message + ",";
									}
									return res.status(500).send(errors)
								}
								else{
									req.session.user = savedUser;
									console.log(savedUser);
									return res.json(savedReview);
								}
							})
						}
					})
				}
			})
		})
	},
	getReviews: (req, res) => {
		Review.find({}).populate('_user').exec( (err, reviews)=>{
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else{
				return res.json(reviews);
			}
		})
	},
	getReview: (req, res) => {
		Review.find({_id: req.params.id}).populate('_user').exec( (err, reviews)=>{
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else{
				return res.json(reviews);
			}
		})
	},
	getMovieReviews: (req, res) => {
		console.log("*******");
		Review.find({movie: req.params.name}).populate('_user').exec( (err, reviews)=>{
			if(err){
				return res.status(500).send("No reviews posted for this movie")
			}
			else{
				return res.json(reviews);
			}
		})
	},
	getUser: (req, res) => {
		User.find({_id: req.params.id}).populate('_reviews').exec( (err, user)=>{
			if(err){
				console.log(err);
				let errors = "";
				for (let i in err.errors){
					errors+=err.errors[i].message + ",";
				}
				return res.status(500).send(errors)
			}
			else{
				return res.json(user);
			}
		})
	},
}