const express = require("express");
const {
	register,
	login,
	uploadAvatar,
	searchTicket,
	updateUser,
	getUser,
	updateUserAndType,
	getAllUsers,
	getUserType,
	deleteUser,
	editProfileAndAvatar,
} = require("../controllers/user.controllers");
const { User, Ticket } = require("../../models");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadImage } = require("../middlewares/upload/uploadImage");
const { checkExists } = require("../middlewares/validations/checkExist");
const { authorize } = require("../middlewares/auth/authorize");
const {
	checkUserRegister,
} = require("../middlewares/validations/checkUserRegister");
const { checkUserEdit } = require("../middlewares/validations/checkUserEdit");
const {
	checkDeleteUser,
} = require("../middlewares/validations/checkDeleteUser");
const {
	checkEmailUpdate,
} = require("../middlewares/validations/checkEmailUpdate");

const userRouter = express.Router();

userRouter.get("/search-ticket/:id", checkExists(User, "user"), searchTicket);
userRouter.post("/register", checkUserRegister, register);
userRouter.post("/login", login);
userRouter.get("/get-list-user", getAllUsers);
userRouter.get("/get-type-user", getUserType);
userRouter.post(
	"/upload-avatar",
	authenticate,
	uploadImage("avatar"),
	uploadAvatar
);
userRouter.get("/:id", checkExists(User, "user"), getUser);
userRouter.delete(
	"/:id",
	checkExists(User, "user"),
	checkDeleteUser,
	deleteUser
);
userRouter.put(
	"/:id",
	authenticate,
	checkExists(User, "user"),
	uploadImage("avatar"),
	checkEmailUpdate,
	updateUser,
	authorize(["ADMIN", "SUPER_ADMIN"]),
	updateUserAndType
);
userRouter.put(
	"/update-profile/:id",
	authenticate,
	checkExists(User, "user"),
	checkUserEdit,
	uploadImage("avatar"),
	editProfileAndAvatar
);

module.exports = {
	userRouter,
};
