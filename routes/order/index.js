const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
const orderController = require("../../controllers/orderController");

router.get("/history", authentication, orderController.getHistoryOrder);
module.exports = router;