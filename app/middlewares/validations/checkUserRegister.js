const { User } = require("../../../models");

const checkUserRegister = async (req, res, next) => {
	const { email } = req.body;
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (!user) {
		next();
	} else {
		res.status(404).send("Email already exists!");
	}
};

module.exports = { checkUserRegister };
