let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = new Schema({
	name: {type: String, required: [true, "You need to input your name"]},
	_reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}],
}, {timestamps:true});
mongoose.model('User', UserSchema)