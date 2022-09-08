const express = require("express");
const { carCompanyRouter } = require("./car-company.routers");
const { seatRouter } = require("./seat.routers");
const { stationRouter } = require("./station.routers");
const { fingerprintRouter } = require("./testFingerprint");
const { tripRouter } = require("./trip.routers");
const { userRouter } = require("./user.routers");
const { vehicleRouter } = require("./vehicle.routers");
const rootRouter = express.Router();

rootRouter.use("/stations", stationRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/trips", tripRouter);
rootRouter.use("/test", fingerprintRouter);
rootRouter.use("/car-company", carCompanyRouter);
rootRouter.use("/vehicles", vehicleRouter);
rootRouter.use("/seats", seatRouter);

module.exports = {
	rootRouter,
};
