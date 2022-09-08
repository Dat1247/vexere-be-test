const express = require("express");
const {
	createTrip,
	getAllTrip,
	getTripDetail,
	deleteTrip,
	updateTrip,
	searchTripsByFromStaAndToSta,
} = require("../controllers/trip.controllers");
const { Trip } = require("../../models");
const { checkExists } = require("../middlewares/validations/checkExist");
const {
	checkDeleteTrip,
} = require("../middlewares/validations/checkDeleteTrip");

const tripRouter = express.Router();

tripRouter.post("/", createTrip);
tripRouter.get("/", getAllTrip);
tripRouter.get(
	"/search-trip-from-to-station/:fromSta&:toSta&:timeStart&:timeEnd",

	searchTripsByFromStaAndToSta
);
tripRouter.get("/:id", checkExists(Trip, "trip"), getTripDetail);
tripRouter.delete(
	"/:id",
	checkExists(Trip, "trip"),
	checkDeleteTrip,
	deleteTrip
);
tripRouter.put("/:id", checkExists(Trip, "trip"), updateTrip);

module.exports = {
	tripRouter,
};
