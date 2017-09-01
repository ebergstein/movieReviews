let controller = require('./../controllers/controller');
module.exports = app => {
	app.post('/login', controller.loginReg);
	app.get('/logout', controller.logout);
	app.get('/current', controller.current);
	app.get('/reviews', controller.getReviews);
	app.get('/review/:id', controller.getReview);
	app.post('/reviews', controller.addReview);
	app.get('/user/:id', controller.getUser);
	app.get('/movie/:name', controller.getMovieReviews);
}