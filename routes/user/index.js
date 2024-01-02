const UserController = require("../../controllers/userController");
const passport = require("../../middlewares/passport");
const router = require("express").Router();
const authentication = require("../../middlewares/authentication");
const isAdmin = require("../../middlewares/isAdmin");

router.use(passport.initialize());
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/profile", authentication, UserController.getUserProfile);
router.put("/profile/edit", authentication, UserController.updateUserProfile);
router.get("/users", authentication, isAdmin, UserController.getUser);
router.delete("/users/delete/:id", authentication, isAdmin, UserController.deleteUser);

module.exports = router;