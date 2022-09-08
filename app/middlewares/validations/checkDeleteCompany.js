const { Vehicle } = require("../../../models");

const checkDeleteCompany = async (req, res, next) => {
	const { id } = req.params;
	const isValid = await Vehicle.findOne({
		where: {
			carCompany_id: id,
		},
	});
	if (!isValid) {
		next();
	} else {
		res
			.status(500)
			.send("The car company already has vehicle, can't be deleted!");
	}
};

module.exports = {
	checkDeleteCompany,
};
