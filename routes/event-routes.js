const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const config = require("../config");

const getEvents = async (req, res) => {
	await config.Event.find().exec().catch(err => {
		return res.status(500).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Events Retrieved Successfully.", result: result});
	});
};

const getEvent = async (req, res) => {
	let eid = req.params.eid;

	await config.Event.findOne({eid: eid}).exec().catch(err => {
		return res.status(500).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		if (!result) {
			return res.status(404).json({message: "Could Not Find Event.", result: {error: "Event Not Found"}});
		}
		return res.json({message: "Event Retrieved Successfully.", result: result});
	});
};

const createEvent = async (req, res) => {
	let newEvent = config.Event({
		eid: uuid.v4(),
		title: req.body.title,
		datetime: req.body.datetime,
		loc: req.body.loc,
		duration: req.body.duration,
		host: req.body.host,
		additional_info: req.body.additional_info
	});

	await newEvent.save().catch(err => {
		return res.status(400).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Event Created Successfully.", result: result});
	});
};

const deleteEvent = async (req, res) => {
	let eid = req.params.eid;

	await config.Event.deleteOne({eid: eid}).exec().catch(err => {
		return res.status(400).json({message: `Error: ${err}`, result: {error: err}});
	}).then(result => {
		return res.json({message: "Event Deleted Successfully.", result: result});
	});
};

router.get("/", getEvents);
router.get("/:eid", getEvent);
router.post("/create", createEvent);
router.delete("/delete/:eid", deleteEvent);

module.exports = router
