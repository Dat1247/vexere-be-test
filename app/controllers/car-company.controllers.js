const { carCompany } = require("../../models");
const { Op } = require("sequelize");

const createCarCompany = async (req, res) => {
	const { name, description } = req.body;
	const { file } = req;

	console.log("file", file);

	try {
		const newCarCompany = await carCompany.create({
			name,
			description,
			image: `${file.destination}/${file.filename}`,
		});

		res.status(201).send({
			message: "Car Company created successfully!",
			data: newCarCompany,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getCarCompanyList = async (req, res) => {
	const { name } = req.query;

	try {
		if (name) {
			const listCarCompany = await carCompany.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send({
				message: "Get car company list successfully!",
				data: listCarCompany,
			});
		} else {
			const listCarCompany = await carCompany.findAll();
			res.status(200).send({
				message: "Get car company list successfully!",
				data: listCarCompany,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const getCarCompanyDetails = async (req, res) => {
	const { item } = req;
	try {
		res.status(200).send({
			message: "Get Car company details successfully!",
			data: item,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const updateCarCompany = async (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	const { file } = req;

	try {
		let carCompanyDetails = await carCompany.findOne({
			where: {
				id,
			},
		});
		if (file) {
			const filePath = `${file.destination}/${file.filename}`;
			carCompanyDetails.image = filePath;
		}
		if (name) {
			carCompanyDetails.name = name;
		}
		if (description) {
			carCompanyDetails.description = description;
		}

		await carCompanyDetails.save();

		res.status(203).send({
			message: "Updated car company successfully!",
			data: carCompanyDetails,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteCarCompany = async (req, res) => {
	const { id } = req.params;
	const { item } = req;
	try {
		await carCompany.destroy({
			where: {
				id,
			},
		});
		res.status(200).send({
			message: "Delete car company successfully!",
			data: item,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	createCarCompany,
	getCarCompanyList,
	getCarCompanyDetails,
	updateCarCompany,
	deleteCarCompany,
};
