const { User, sequelize } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url");
const e = require("express");

const listTypeUser = [
	{
		id: 1,
		value: "ADMIN",
		name: "ADMIN",
	},
	{
		id: 2,
		value: "CLIENT",
		name: "CLIENT",
	},
];

const register = async (req, res) => {
	const { name, email, password, numberPhone, type } = req.body;
	try {
		const salt = bcrypt.genSaltSync(15);
		const hashPassword = bcrypt.hashSync(password, salt);
		const avatarUrl = gravatarUrl(email);
		if (type) {
			const newUser = await User.create({
				name,
				email,
				password: hashPassword,
				numberPhone,
				avatar: avatarUrl,
				type,
			});
			res.status(201).send({
				message: "User created successfully!",
				data: newUser,
			});
		} else {
			const newUser = await User.create({
				name,
				email,
				password: hashPassword,
				numberPhone,
				avatar: avatarUrl,
			});
			res.status(201).send({
				message: "User created successfully!",
				data: newUser,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (user) {
		const isAuth = bcrypt.compareSync(password, user.password);
		if (isAuth) {
			const token = jwt.sign(
				{
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					numberPhone: user.numberPhone,
					email: user.email,
					userType: user.type,
				},
				"create-token",
				{
					expiresIn: 60 * 60 * 24,
				}
			);
			const userLogin = {
				id: user.id,
				name: user.name,
				avatar: user.avatar,
				numberPhone: user.numberPhone,
				email: user.email,
				userType: user.type,
				token: token,
			};
			res.status(200).send({
				message: "Log in successfully!",
				userLogin: userLogin,
			});
		} else {
			res.status(500).send("Email or password incorrect!");
		}
	} else {
		res.status(404).send("Not Found!");
	}
};

const searchTicket = async (req, res) => {
	const { id } = req.params;

	try {
		const [results] = await sequelize.query(`
            select users.name as username,tickets.id as ticketId, fromStation.name as fromStation, toStation.name as toStation, vehicles.id as vehicleId,vehicles.name as vehicle, carcompanies.name as carCompany,seats.name as soGhe, price, startTime, tickets.createdAt, tickets.updatedAt from users
            inner join tickets on users.id = tickets.user_id
            inner join trips on trips.id = tickets.trip_id
            inner join stations as fromStation on fromStation.id = trips.fromStation
            inner join stations as toStation on toStation.id = trips.toStation
            inner join seats on seats.ticket_id = tickets.id
            inner join vehicles on vehicles.id = seats.vehicle_id
            inner join carcompanies on carcompanies.id = vehicles.carCompany_id
            where users.id = ${id};
        `);
		res.status(200).send({
			message: "Search trip successfully!",
			data: results,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

const uploadAvatar = async (req, res) => {
	const { user, file } = req;
	const avatarPath = `/${file.path}`;
	const userFound = await User.findOne({
		email: user.email,
	});
	userFound.avatar = avatarPath;
	await userFound.save();
	res.send(userFound);
};

const getAllUsers = async (req, res) => {
	const { name } = req.query;
	try {
		if (name) {
			const listUser = await User.findAll({
				where: {
					name: {
						[Op.like]: `%${name}%`,
					},
				},
			});
			res.status(200).send(listUser);
		} else {
			const listUser = await User.findAll();
			res.status(200).send(listUser);
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const getUser = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});
		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getUserType = async (req, res) => {
	res.status(200).send(listTypeUser);
};

const updateUser = async (req, res, next) => {
	const { name, email, numberPhone, type } = req.body;
	const { id } = req.params;
	const { file } = req;
	try {
		const user = await User.findOne({
			where: {
				id,
			},
		});
		if (file) {
			const pathName = `${file.destination}/${file.filename}`;
			user.avatar = pathName;
		}
		if (user.type !== type) {
			req.userUpdate = user;
			next();
		} else {
			user.name = name;
			user.email = email;
			user.numberPhone = numberPhone;
			await user.save();
			res.status(200).send({
				message: "Updated user successfully!",
				data: user,
			});
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const updateUserAndType = async (req, res) => {
	const { userUpdate } = req;
	const { name, email, numberPhone, type } = req.body;

	try {
		userUpdate.name = name;
		userUpdate.email = email;
		userUpdate.numberPhone = numberPhone;
		userUpdate.type = type;
		await userUpdate.save();
		res.status(200).send({
			message: "Updated user successfully!",
			data: userUpdate,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await User.destroy({
			where: {
				id,
			},
		});
		res.status(200).send("Delete user successfully!");
	} catch (err) {
		res.status(500).send(err);
	}
};

const editProfileAndAvatar = async (req, res) => {
	const { id } = req.params;
	const { name, password, numberPhone, email } = req.body;
	const { file } = req;

	try {
		const userDetailEdit = await User.findOne({
			where: {
				id,
			},
		});
		if (file) {
			const pathName = `${file.destination}/${file.filename}`;
			userDetailEdit.avatar = pathName;
		}
		if (password) {
			const salt = bcrypt.genSaltSync(15);
			const hashPassword = bcrypt.hashSync(password, salt);
			userDetailEdit.password = hashPassword;
		}
		if (name) {
			userDetailEdit.name = name;
		}
		if (numberPhone) {
			userDetailEdit.numberPhone = numberPhone;
		}
		if (email) {
			userDetailEdit.email = email;
		}
		await userDetailEdit.save();

		res.status(203).send(userDetailEdit);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	register,
	login,
	uploadAvatar,
	searchTicket,
	updateUser,
	getUser,
	updateUserAndType,
	getAllUsers,
	getUserType,
	listTypeUser,
	deleteUser,
	editProfileAndAvatar,
};
