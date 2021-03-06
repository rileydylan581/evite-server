require("dotenv").config();

exports.PORT = parseInt(process.env.PORT);

exports.Mongoose = require("mongoose");

exports.Event = require("./models/event");
exports.Invite = require("./models/invite");

exports.DB_USER = process.env.DB_USER;
exports.DB_PASS = process.env.DB_PASS;
exports.DB_CLUSTER = process.env.DB_CLUSTER;
exports.DB_NAME = process.env.DB_NAME;

exports.CONN_URI = `mongodb+srv://${exports.DB_USER}:${exports.DB_PASS}@${exports.DB_CLUSTER}.jqaro.mongodb.net/${exports.DB_NAME}?retryWrites=true@w=majority`;

exports.Mongoose.connect(exports.CONN_URI, {useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
	console.log("Connected To Database");
}).catch((err) => {
	console.log(exports.CONN_URI);
	console.log(`Connection Failed!\nError: ${err}`);
});
