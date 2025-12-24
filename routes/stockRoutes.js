const express = require("express");
const { getAllStock, createNewStockItem, getStockItem, updateStockItem, deleteStockItem } = require("../controllers/stockController");
const { protect} = require('../controllers/authController');
const router = express.Router();

// -------------- AUTHENCTICATION ROUTES  --------------
// Check if user login or not
router.use(protect);

// -------------- PROTECTED ROUTES  --------------
router.route("/")
  .get(getAllStock)
  .post(createNewStockItem);

router.route("/:id")
  .get(getStockItem)
  .patch(updateStockItem)
  .delete(deleteStockItem);

module.exports = router;