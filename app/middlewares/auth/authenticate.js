const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	try {
		const decode = jwt.verify(token, "create-token");

		if (decode) {
			req.user = decode;
			return next();
		} else {
			res.status(401).send("You must log in!");
		}
	} catch (err) {
		res.status(401).send("You must log in!");
	}
};

module.exports = {
	authenticate,
};
