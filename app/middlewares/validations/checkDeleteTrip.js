const { Vehicle, Ticket } = require("../../../models");

const checkDeleteTrip = async (req, res, next) => {
	const { id } = req.params;
	const isValid = await Vehicle.findOne({
		where: {
			trip_id: id,
		},
	});
	const isValidTicket = await Ticket.findOne({
		where: {
			trip_id: id,
		},
	});
	if (!isValid && !isValidTicket) {
		next();
	} else {
		res
			.status(500)
			.send("The trip already has vehicle or ticket, can't be deleted!");
	}
};

module.exports = {
	checkDeleteTrip,
};
