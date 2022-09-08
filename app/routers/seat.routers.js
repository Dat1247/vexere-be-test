const express = require("express");
const {
	createSeat,
	getSeatList,
	getSeatDetails,
	updateSeat,
	deleteSeat,
	getTicket,
	getSeatByVehicleId,
} = require("../controllers/seat.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExists } = require("../middlewares/validations/checkExist");
const { Seat } = require("../../models");

const seatRouter = express.Router();

seatRouter.post("/", createSeat);
seatRouter.post("/dat-ve", authenticate, getTicket);
seatRouter.get("/", getSeatList);
seatRouter.get("/list-seat/:id", checkExists(Seat, "seat"), getSeatByVehicleId);
seatRouter.get("/:id", checkExists(Seat, "seat"), getSeatDetails);
seatRouter.put("/:id", checkExists(Seat, "seat"), updateSeat);
seatRouter.delete("/:id", checkExists(Seat, "seat"), deleteSeat);

module.exports = {
	seatRouter,
};
