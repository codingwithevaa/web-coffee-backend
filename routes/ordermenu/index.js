const orderMenuController = require("../../controllers/ordermenuController");
const router = require("express").Router();
const authentication = require("../../middlewares/authentication");

router.post("/", authentication, orderMenuController.createOrder);

module.exports = router;