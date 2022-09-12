const { Trip, Station, sequelize } = require("../../models");
const { Op } = require("sequelize");
const moment = require("moment");

const createTrip = async (req, res) => {
	const { fromStation, toStation, startTime, price } = req.body;
	// let time = moment(startTime).format("YYYY-MM-DD HH:mm:ss");
	try {
		const newTrip = await Trip.create({
			fromStation,
			toStation,
			startTime,
			price,
		});

		res.status(201).send({
			message: "Create trip successfully!",
			data: newTrip,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllTrip = async (req, res) => {
	try {
		const listTrip = await Trip.findAll({
			include: [
				{
					model: Station,
					as: "from",
				},
				{
					model: Station,
					as: "to",
				},
			],
		});

		res.status(200).send({
			message: "Get trip successfully!",
			data: listTrip,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

const getTripDetail = async (req, res) => {
	const { id } = req.params;
	try {
		let trip = await Trip.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Station,
					as: "from",
				},
				{
					model: Station,
					as: "to",
				},
			],
		});
		if (trip) {
			res.status(200).send({
				trip,
			});
		} else {
			res.status(404).send("Not Found!");
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

const deleteTrip = async (req, res) => {
	const { id } = req.params;
	try {
		const trip = await Trip.findOne({
			where: {
				id,
			},
		});
		await Trip.destroy({
			where: {
				id,
			},
		});

		res.status(200).send({
			message: `Deleted trip have id = ${id}!`,
			data: trip,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateTrip = async (req, res) => {
	const { id } = req.params;
	const { fromStation, toStation, startTime, price } = req.body;

	try {
		await Trip.update(
			{ fromStation, toStation, startTime, price },
			{
				where: {
					id,
				},
			}
		);
		res.status(200).send({
			message: `Updated trip have id = ${id}`,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

const searchTripsByFromStaAndToSta = async (req, res) => {
	const { fromSta, toSta, timeStart, timeEnd } = req.params;
	console.log({ fromSta, toSta, timeStart, timeEnd });
	try {
		const [results] = await sequelize.query(`
		SELECT Trips.id AS tripId, Trips.startTime, Trips.price, 
		fromSta.name AS fromSta, fromSta.address AS fromAddress, fromSta.province AS fromProvince,  
		toSta.name AS toSta, toSta.address AS toAddress, toSta.province AS toProvince, 
		Vehicles.name AS vehicleName, Vehicles.typeVehicle AS typeVehicle, Vehicles.id AS vehicleId, 
		company.name AS companyCarName, company.image AS companyCarImage, 
		Seats.name AS seatName, Seats.status AS statusSeat, count(Seats.status) AS seatRemaining FROM Trips
			  INNER JOIN Stations AS fromSta ON fromSta.id = Trips.fromStation
			  INNER JOIN Stations AS toSta ON toSta.id = Trips.toStation
			  INNER JOIN Vehicles ON Trips.id = Vehicles.trip_id
			  LEFT JOIN Seats ON Seats.vehicle_id = Vehicles.id
			  INNER JOIN carCompanies AS company ON company.id = Vehicles.carCompany_id
			  WHERE fromSta.province = '${fromSta}' && toSta.province = '${toSta}' && Trips.startTime >= '${timeStart}' &&  Trips.startTime <= '${timeEnd}' && Seats.status = false
			  group by Vehicles.id;
        `);
		res.status(200).send({
			message: "Search trip successfully!",
			data: results,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createTrip,
	getAllTrip,
	getTripDetail,
	deleteTrip,
	searchTripsByFromStaAndToSta,
	updateTrip,
};
