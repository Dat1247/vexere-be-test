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
		select trips.id as tripId, trips.startTime, trips.price, 
		fromSta.name as fromSta, fromSta.address as fromAddress, fromSta.province as fromProvince,  
		toSta.name as toSta, toSta.address as toAddress, toSta.province as toProvince, 
		vehicles.name as vehicleName, vehicles.typeVehicle as typeVehicle, vehicles.id as vehicleId, 
		company.name as companyCarName, company.image as companyCarImage, 
		seats.name as seatName, seats.status as statusSeat, count(seats.status) as seatRemaining
		from trips
			  inner join stations as fromSta on fromSta.id = trips.fromStation
			  inner join stations as toSta on toSta.id = trips.toStation
			  inner join vehicles on trips.id = vehicles.trip_id
			  left join seats on seats.vehicle_id = vehicles.id
			  inner join carcompanies as company on company.id = vehicles.carCompany_id
			  where fromSta.province = '${fromSta}' && toSta.province = '${toSta}' && trips.startTime >= '${timeStart}' &&  trips.startTime <= '${timeEnd}' && seats.status = false
			  group by vehicles.id;
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
