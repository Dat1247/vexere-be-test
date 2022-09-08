const { Ticket } = require("../../../models");

const checkDeleteUser = async (req, res, next) => {
	const { id } = req.params;
	const userHadTicket = await Ticket.findOne({
		where: {
			user_id: id,
		},
	});
	if (!userHadTicket) {
		next();
	} else {
		res.status(500).send("The user has booked tickets, can't be deleted!");
	}
};

module.exports = {
	checkDeleteUser,
};
