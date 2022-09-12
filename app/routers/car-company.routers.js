const express = require("express");
const {
	createCarCompany,
	getCarCompanyList,
	getCarCompanyDetails,
	updateCarCompany,
	deleteCarCompany,
} = require("../controllers/car-company.controllers");
const { carCompany } = require("../../models");
const { uploadImage } = require("../middlewares/upload/uploadImage");
const { checkExists } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const {
	checkDeleteCompany,
} = require("../middlewares/validations/checkDeleteCompany");
const carCompanyRouter = express.Router();

carCompanyRouter.post(
	"/",
	authenticate,
	authorize(["ADMIN"]),
	uploadImage("company"),
	createCarCompany
);
carCompanyRouter.get("/", getCarCompanyList);
carCompanyRouter.get(
	"/:id",
	checkExists(carCompany, "car company"),
	getCarCompanyDetails
);

carCompanyRouter.put(
	"/:id",
	checkExists(carCompany, "car company"),
	uploadImage("company"),
	updateCarCompany
);
carCompanyRouter.delete(
	"/:id",
	checkExists(carCompany, "car company"),
	checkDeleteCompany,
	deleteCarCompany
);

module.exports = {
	carCompanyRouter,
};
