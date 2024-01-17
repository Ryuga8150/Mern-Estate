const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.route("/").get(userController.getUsers);
router.route("/test").get(userController.test);
router.post("/update/:id", verifyToken, userController.updateUser);
router.delete("/delete/:id", verifyToken, userController.deleteUser);

module.exports = router;
