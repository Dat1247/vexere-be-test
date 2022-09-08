const express = require("express");
const {
	createVehicle,
	getVehicleList,
	getVehicleDetails,
	updateVehicle,
	deleteVehicle,
	createVehicleWithSeat,
	getTripList,
	getListVehicleTypes,
} = require("../controllers/vehicle.controllers");
const { Vehicle } = require("../../models");
const { checkExists } = require("../middlewares/validations/checkExist");
const vehicleRouter = express.Router();

vehicleRouter.post("/", createVehicle);
vehicleRouter.get("/", getVehicleList);
vehicleRouter.get("/getVehicleList", getTripList);
vehicleRouter.get("/vehicletypes", getListVehicleTypes);
vehicleRouter.post("/create-vehicle-and-seat", createVehicleWithSeat);
vehicleRouter.get("/:id", checkExists(Vehicle, "vehicle"), getVehicleDetails);
vehicleRouter.put("/:id", checkExists(Vehicle, "vehicle"), updateVehicle);
vehicleRouter.delete("/:id", checkExists(Vehicle, "vehicle"), deleteVehicle);

module.exports = { vehicleRouter };
