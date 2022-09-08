const express = require("express");
const { Station } = require("../../models");
const {
	createStation,
	getAllStation,
	getStationDetail,
	updateStation,
	deleteStation,
	getListProvince,
} = require("../controllers/station.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const { checkExists } = require("../middlewares/validations/checkExist");
const stationRouter = express.Router();

stationRouter.post(
	"/",
	authenticate,
	authorize(["ADMIN", "Super_Admin"]),
	createStation
);
stationRouter.get("/province", getListProvince);
stationRouter.get("/", getAllStation);
stationRouter.get("/:id", checkExists(Station, "station"), getStationDetail);
stationRouter.put(
	"/:id",
	authenticate,
	checkExists(Station, "station"),
	updateStation
);
stationRouter.delete(
	"/:id",
	authenticate,
	checkExists(Station, "station"),
	deleteStation
);

module.exports = {
	stationRouter,
};
