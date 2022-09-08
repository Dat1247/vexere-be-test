const checkUserEdit = (req, res, next) => {
	const { id } = req.params;
	const { user } = req;

	if (user.id == id) {
		next();
	} else {
		res.status(500).send("You don't have authorize to this feature!");
	}
};

module.exports = {
	checkUserEdit,
};
