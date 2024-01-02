const menuController = require("../../controllers/menuController");
const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
const isAdmin = require("../../middlewares/isAdmin");

router.get("/", menuController.getMenu);
router.get("/:id", menuController.getMenuId);

//Hanya user dengan role admin yang dapat melakukan Post, Put dan Delete MENU
router.post("/addMenu", authentication, isAdmin, menuController.addMenu);
router.put("/updateMenu/:id", authentication, isAdmin, menuController.updateMenuByID);
router.delete("/deleteMenu/:id", authentication, isAdmin, menuController.deleteMenu);

module.exports = router;