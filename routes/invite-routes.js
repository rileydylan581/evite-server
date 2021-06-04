const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const config = require("../config");

const getInvites = async (req, res) => {
	await config.Invite.find().exec().catch(err => {
		return res.status(500).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Invites Retrieved Successfully.", result: result});
	});
};

const getInvite = async (req, res) => {
	let iid = req.params.iid;

	await config.Invite.findOne({iid: iid}).exec().catch(err => {
		return res.status(500).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		if (!result) {
			return res.status(404).json({message: "Could Not Find Invite. This Could Be Because It Doesn't Exist Or Was Deleted.", result: {error: "Invite Not Found"}});
		}
		return res.json({message: "Invite Retrived Successfully.", result: result});
	});
};

const createInvite = async (req, res) => {
	const newInvite = config.Invite({
		iid: uuid.v4(),
		eid: req.body.eid,
		invitee: req.body.invitee,
		recieved: false,
		attending: "Hasn't Responded"
	});

	await newInvite.save().catch(err => {
		return res.status(400).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Invite Created Successfully.", result: result});
	});
};

const deleteInvite = async (req, res) => {
	let iid = req.params.iid;

	await config.Invite.deleteOne({iid: iid}).exec().catch(err => {
		return res.status(400).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Invite Deleted Successfully.", result: result});
	});
};

router.get("/", getInvites);
router.get("/:iid", getInvite);
router.post("/create", createInvite);
router.delete("/delete/:iid", deleteInvite);

module.exports = router;
