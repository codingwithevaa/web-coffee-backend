const router = require("express").Router();
const userRouter = require("./user/index");
const menuRouter = require("./menu/index");
const ordermenuRouter = require("./ordermenu/index");

router.use("/menu", menuRouter);
const menusRouter = require("./menu/index");
const orderMenuRouter = require("./ordermenu/index");
const orderRouter = require("./order/index");

router.use("/menu", menusRouter);
router.use("/ordermenu", orderMenuRouter);
router.use("/order", orderRouter);

router.use(userRouter);
module.exports = router;