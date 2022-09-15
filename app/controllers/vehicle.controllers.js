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
				SELECT Vehicles.id AS id, Vehicles.name AS vehicleName, Vehicles.typeVehicle AS typeVehicle, fromSta.name AS fromStationName, toSta.name AS toStationName, Trips.startTime AS startTime, Trips.price AS price, carCompanies.name AS carCompanyName, Vehicles.createdAt AS createdAt, Vehicles.updatedAt AS updatedAt, Vehicles.trip_id AS trip_id, Vehicles.carCompany_id AS carCompany_id FROM Vehicles
				INNER JOIN Trips ON Trips.id = Vehicles.trip_id
				INNER JOIN Stations AS fromSta on fromSta.id = Trips.fromStation
				INNER JOIN Stations AS toSta on toSta.id = Trips.toStation
				INNER JOIN carCompanies ON carCompanies.id = Vehicles.carCompany_id
				WHERE Vehicles.name LIKE '%${search}%' OR fromSta.name LIKE '%${search}%' OR toSta.name LIKE '%${search}%' OR carCompanies.name LIKE '%${search}%';
			`);

			res.status(200).send({
				message: "Search trip successfully!",
				data: results,
			});
		} else {
			const [results] = await sequelize.query(`
			SELECT Vehicles.id AS id, Vehicles.name AS vehicleName, Vehicles.typeVehicle AS typeVehicle, fromSta.name AS fromStationName, toSta.name AS toStationName, Trips.startTime AS startTime, Trips.price AS price, carCompanies.name AS carCompanyName, Vehicles.createdAt AS createdAt, Vehicles.updatedAt AS updatedAt, Vehicles.trip_id AS trip_id, Vehicles.carCompany_id AS carCompany_id FROM Vehicles
				INNER JOIN Trips ON Trips.id = Vehicles.trip_id
				INNER JOIN Stations AS fromSta on fromSta.id = Trips.fromStation
				INNER JOIN Stations AS toSta on toSta.id = Trips.toStation
				INNER JOIN carCompanies ON carCompanies.id = Vehicles.carCompany_id
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
	const { id } = req.params;
	try {
		const [result] = await sequelize.query(`
			SELECT Vehicles.id AS id, Vehicles.name AS vehicleName, Vehicles.typeVehicle AS typeVehicle, fromSta.name AS fromStationName, toSta.name AS toStationName, Trips.startTime AS startTime, Trips.price AS price, carCompanies.name AS carCompanyName, Vehicles.createdAt AS createdAt, Vehicles.updatedAt AS updatedAt, Vehicles.trip_id AS trip_id, Vehicles.carCompany_id AS carCompany_id FROM Vehicles
				INNER JOIN Trips ON Trips.id = Vehicles.trip_id
				INNER JOIN Stations AS fromSta on fromSta.id = Trips.fromStation
				INNER JOIN Stations AS toSta on toSta.id = Trips.toStation
				INNER JOIN carCompanies ON carCompanies.id = Vehicles.carCompany_id
				WHERE Vehicles.id = ${id}
		`);

		res.status(200).send({
			message: "Get vehicle details successfully!",
			data: result,
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
			numberSeats = 24;
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
