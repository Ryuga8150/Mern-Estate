const express = require("express");
const listController = require("../controllers/listController");
const { verifyToken } = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, listController.createListing);
router.delete("/delete/:id", verifyToken, listController.deleteListing);
router.patch("/update/:id", verifyToken, listController.updateListing);
// router.get("/get", listController.getListings);
router.get("/get/:id", listController.getListing);
router.get("/get", listController.getListings);

module.exports = router;
