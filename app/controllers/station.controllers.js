const { Op } = require("sequelize");
const { Station } = require("../../models");

const listProvince = [
	{
		id: 1,
		code: "HCM",
		value: "Hồ Chí Minh",
	},
	{
		id: 2,
		code: "CT",
		value: "Cần Thơ",
	},
	{
		id: 3,
		code: "DN",
		value: "Đà Nẵng",
	},
	{
		id: 4,
		code: "AG",
		value: "An Giang",
	},
	{
		id: 5,
		code: "ST",
		value: "Sóc Trăng",
	},
	{
		id: 6,
		code: "HN",
		value: "Hà Nội",
	},
	{
		id: 7,
		code: "TH",
		value: "Thanh Hóa",
	},
	{
		id: 8,
		code: "LC",
		value: "Lào Cai",
	},
	{
		id: 9,
		code: "KG",
		value: "Kiên Giang",
	},
	{
		id: 10,
		code: "BT",
		value: "Bình Thuận",
	},
];

const createStation = async (req, res) => {
	const { name, address, province } = req.body;
	try {
		const newStation = await Station.create({ name, address, province });
		res.status(201).send({
			message: "Station created successfully!",
			data: newStation,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getAllStation = async (req, res) => {
	const { name } = req.query;

	try {
		if (name) {
			const listStation = await Station.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send({
				message: "Get station successfully!",
				data: listStation,
			});
		} else {
			const listStation = await Station.findAll();
			res.status(200).send({
				message: "Get station successfully!",
				data: listStation,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const getStationDetail = async (req, res) => {
	const { id } = req.params;
	try {
		const stationDetail = await Station.findOne({
			where: {
				id,
			},
		});

		res.status(200).send({
			message: "Get station successfully!",
			data: stationDetail,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const getListProvince = async (req, res) => {
	res.status(200).send(listProvince);
};

const updateStation = async (req, res) => {
	const { id } = req.params;
	const { name, address, province } = req.body;
	try {
		const stationDetail = await Station.findOne({
			where: {
				id,
			},
		});

		stationDetail.name = name;
		stationDetail.address = address;
		stationDetail.province = province;

		await stationDetail.save();
		res.status(200).send({
			message: "Update station successfully!",
			data: stationDetail,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteStation = async (req, res) => {
	const { id } = req.params;
	try {
		const detailStation = await Station.findOne({
			where: {
				id,
			},
		});

		await Station.destroy({
			where: {
				id,
			},
		});

		res.status(200).send({
			message: "Delete station successfully!",
			data: detailStation,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createStation,
	getAllStation,
	getStationDetail,
	updateStation,
	deleteStation,
	getListProvince,
};
