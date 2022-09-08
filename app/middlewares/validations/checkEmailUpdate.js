const { User } = require("../../../models");

const checkEmailUpdate = async (req, res, next) => {
	const { email } = req.body;
	const { id } = req.params;
	const user = await User.findOne({
		where: {
			email,
		},
	});

	if (!user || user.id == id) {
		next();
	} else {
		res.status(500).send("Email already exists!");
	}
};

module.exports = {
	checkEmailUpdate,
};
