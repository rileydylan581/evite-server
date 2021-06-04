const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const config = require("./config");
const cors = require("cors");


const app = express();


const eventRouter = require("./routes/event-routes");
const inviteRouter = require("./routes/invite-routes");

app.use(bodyParser.json());
app.use(cors());

app.use("/api/events", eventRouter);
app.use("/api/invites", inviteRouter);


app.listen(config.PORT, () => {
	console.log(`Listening On Port ${config.PORT}`);
});
