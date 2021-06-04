const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
	eid: {type: String, required: true, minlength: 36, maxlength: 36},
	title: {type: String, required: true, minlength: 5, maxlength: 36},
	datetime: {type: String, required: true},
	loc: {type: String, required: true},
	duration: {type: String, required: true},
	host: {type: String, required: true},
	additional_info: {type: String, required: true}
});

module.exports = mongoose.model("Event", eventSchema);
