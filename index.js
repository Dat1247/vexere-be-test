const express = require("express");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models/index");
const { rootRouter } = require("./app/routers");
const Fingerprint = require("express-fingerprint");

const app = express();
const port = process.env.PORT || 5000;

app.use(Fingerprint());

app.use(cors());
app.use(express.json());

const publicPathDirectory = path.join(__dirname, "./public");
app.use("/public", express.static(publicPathDirectory));

app.use("/api/v1", rootRouter);

app.listen(port, async () => {
	console.log(`App running on port ${port}`);
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully");
	} catch (err) {
		console.log("Unable to connect to the database:", err);
	}
});
