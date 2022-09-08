const { Vehicle, Seat, Trip, carCompany, sequelize } = require("../../models");

const vehicleTypes = [
	{
		id: 1,
		value: "GNG",
		name: "Ghế ngồi",
	},
	{
		id: 2,
		value: "GN",
		name: "Giường nằm",
	},
];

const createVehicle = async (req, res) => {
	const { name, numberSeats, carCompany_id, trip_id } = req.body;

	const newVehicle = await Vehicle.create({
		name,
		numberSeats,
		carCompany_id,
		trip_id,
	});

	res.status(201).send({
		message: "Vehicle created successfully!",
		data: newVehicle,
	});
};

const getVehicleList = async (req, res) => {
	try {
		const listVehicle = await Vehicle.findAll({
			include: [
				{
					model: Trip,
					as: "trip",
				},
				{
					model: carCompany,
					as: "carCompany",
				},
			],
		});
		res.status(200).send({
			message: "Get vehicle list successfully!",
			data: listVehicle,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getTripList = async (req, res) => {
	const { search } = req.query;

	try {
		if (search) {
			const [results] = await sequelize.query(`
				select vehicles.id as id, vehicles.name as vehicleName, vehicles.typeVehicle as typeVehicle, fromSta.name as fromStationName, toSta.name as toStationName,trips.startTime as startTime, trips.price as price, carcompanies.name as carCompanyName, vehicles.createdAt as createdAt, vehicles.updatedAt as updatedAt, vehicles.trip_id as trip_id, vehicles.carCompany_id as carCompany_id from vehicles
				inner join trips on trips.id = vehicles.trip_id
				inner join stations as fromSta on fromSta.id = trips.fromStation
				inner join stations as toSta on toSta.id = trips.toStation
				inner join carcompanies on carcompanies.id = vehicles.carCompany_id
				where vehicles.name like '%${search}%' or fromSta.name like '%${search}%' or toSta.name like '%${search}%' or carcompanies.name like '%${search}%';
			`);

			res.status(200).send({
				message: "Search trip successfully!",
				data: results,
			});
		} else {
			const [results] = await sequelize.query(`
			select vehicles.id as id, vehicles.name as vehicleName, vehicles.typeVehicle as typeVehicle, fromSta.name as fromStationName, toSta.name as toStationName,trips.startTime as startTime, trips.price as price, carcompanies.name as carCompanyName, vehicles.createdAt as createdAt, vehicles.updatedAt as updatedAt, vehicles.trip_id as trip_id, vehicles.carCompany_id as carCompany_id from vehicles
			inner join trips on trips.id = vehicles.trip_id
			inner join stations as fromSta on fromSta.id = trips.fromStation
			inner join stations as toSta on toSta.id = trips.toStation
			inner join carcompanies on carcompanies.id = vehicles.carCompany_id
		`);

			res.status(200).send({
				message: "Search trip successfully!",
				data: results,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const getVehicleDetails = async (req, res) => {
	try {
		const vehicle = req.item;
		res.status(200).send({
			message: "Get vehicle details successfully!",
			data: vehicle,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getListVehicleTypes = async (req, res) => {
	res.status(200).send(vehicleTypes);
};

const updateVehicle = async (req, res) => {
	const { id } = req.params;
	const { name, typeVehicle, carCompany_id, trip_id } = req.body;
	try {
		await Vehicle.update(
			{ name, typeVehicle, carCompany_id, trip_id },
			{
				where: { id },
			}
		);
		res.status(200).send({
			message: "Vehicle updated successfully!",
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteVehicle = async (req, res) => {
	const { id } = req.params;
	try {
		await Seat.destroy({
			where: {
				vehicle_id: id,
			},
		});

		await Vehicle.destroy({
			where: { id },
		});
		res.status(200).send({
			message: `Vehicle have id = ${id} is deleted successfully!`,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const createVehicleWithSeat = async (req, res) => {
	const { name, typeVehicle, carCompany_id, trip_id } = req.body;
	try {
		const newVehicle = await Vehicle.create({
			name,
			carCompany_id,
			typeVehicle,
			trip_id,
		});

		let numberSeats = 0;
		if (typeVehicle === "GN") {
			numberSeats = 25;
		} else {
			numberSeats = 45;
		}

		for (let i = 0; i < numberSeats; i++) {
			let nameSeat = `Ghế ${i + 1}`;
			const newSeat = await Seat.create({
				name: nameSeat,
				vehicle_id: newVehicle.id,
			});
		}

		res.status(201).send({
			message: "Vehicle created successfully!",
			data: newVehicle,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	createVehicle,
	getVehicleList,
	getVehicleDetails,
	updateVehicle,
	deleteVehicle,
	createVehicleWithSeat,
	getTripList,
	getListVehicleTypes,
};
