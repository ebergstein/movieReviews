let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
	_user: {type: Schema.Types.ObjectId, ref: 'User'},
	header: {type: String, required: [true, "You need to write a header."]},
	review: {type: String, required: [true, "You need to write your review."]},
	movie: {type: String, required: [true, "You need to specify what movie you are reviewing"]},
	rating: {type: Number, required: [true, "You need give the movie a rating from 0-10"], min: [0, "The rating cannot be lower than 0"], max: [11, "The rating cannot be higher than 10"]},
}, {timestamps:true});
mongoose.model('Review', ReviewSchema)