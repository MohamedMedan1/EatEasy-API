const express = require("express");
const { getAllStock, createNewStockItem, getStockItem, updateStockItem, deleteStockItem } = require("../controllers/stockController");
const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/")
  .get(getAllStock)
  .post(createNewStockItem);

router.route("/:id")
  .get(getStockItem)
  .patch(updateStockItem)
  .delete(deleteStockItem);

module.exports = router;