const { Seat, User, Ticket } = require("../../models");

const createSeat = async (req, res) => {
	const { name, vehicle_id } = req.body;
	try {
		const newSeat = await Seat.create({ name, vehicle_id });
		res.status(201).send({
			message: "Seat created successfully!",
			data: newSeat,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getSeatList = async (req, res) => {
	try {
		const listSeats = await Seat.findAll();
		res.status(200).send({
			message: "Get list seats successfully!",
			data: listSeats,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getSeatByVehicleId = async (req, res) => {
	const { id } = req.params;
	try {
		const listSeat = await Seat.findAll({
			where: {
				vehicle_id: id,
			},
		});
		res.status(200).send(listSeat);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getSeatDetails = async (req, res) => {
	const { id } = req.params;
	try {
		const seat = await Seat.findOne({
			where: { id },
		});
		res.status(200).send({
			message: `Get details of seat have id = ${id} successfully!`,
			data: seat,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const updateSeat = async (req, res) => {
	const { id } = req.params;
	const { name, vehicle_id } = req.body;
	try {
		await Seat.update({ name, vehicle_id }, { where: { id } });
		const seatUpdate = await Seat.findOne({
			where: {
				id,
			},
		});

		res.status(200).send({
			message: `Updated seat have id = ${id} successfully!`,
			data: seatUpdate,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteSeat = async (req, res) => {
	const { id } = req.params;
	try {
		await Seat.destroy({
			where: {
				id,
			},
		});
		res.status(200).send({
			message: `Deleted seat have id = ${id} successfully!`,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getTicket = async (req, res) => {
	const { user } = req;
	const { tripId, listSeatChoosing } = req.body;
	try {
		const userFind = await User.findOne({
			where: {
				email: user.email,
			},
		});
		const newTicket = await Ticket.create({
			trip_id: tripId,
			user_id: userFind.id,
		});
		listSeatChoosing.forEach(async (seat) => {
			const seatFind = await Seat.findOne({
				where: {
					id: seat.id,
				},
			});

			seatFind.ticket_id = newTicket.id;
			seatFind.status = true;
			await seatFind.save();
		});

		res.status(201).send({
			message: "Get ticket successfully!",
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	createSeat,
	getSeatList,
	getSeatDetails,
	updateSeat,
	deleteSeat,
	getTicket,
	getSeatByVehicleId,
};
