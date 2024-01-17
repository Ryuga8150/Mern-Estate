const express = require("express");
const listController = require("../controllers/listController");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, listController.createListing);

module.exports = router;
