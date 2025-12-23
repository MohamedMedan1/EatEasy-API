const express = require("express");
const {
  getAllOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");
const insertTableNumber = require("../middlewares/insertTableNumber");
const getCartFromMenu = require("../middlewares/getCartFromMenu");
const calculateCartTotalPrice = require("../middlewares/calculateCartTotalPrice");
const activateTable = require("../middlewares/activateTable");
const decreaseStockAfterOrder = require("../middlewares/decreaseStockAfterOrder");
const applySoldoutItems = require("../middlewares/applySoldoutItems");

const router = express.Router();

// -------------- MAIN ROUTES  --------------
router
  .route("/")
  .get(getAllOrders)
  .post(
    activateTable,
    insertTableNumber,
    getCartFromMenu,
    calculateCartTotalPrice,
    decreaseStockAfterOrder,
    createNewOrder,
    applySoldoutItems
  );

router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
