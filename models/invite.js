const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema({
	iid: {type: String, required: true, minlength: 36, maxlength: 36},
	eid: {type: String, required: true, minlength: 36, maxlength: 36},
	invitee: {type: String, required: true},
	recieved: {type: Boolean, required: true},
	attending: {type: String, required: true}
});

module.exports = mongoose.model("Invite", inviteSchema);
