const express = require("express");
const {
  getAllOrders,
  getOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController");
const { protect} = require('../controllers/authController');
const insertTableNumber = require("../middlewares/insertTableNumber");
const getCartFromMenu = require("../middlewares/getCartFromMenu");
const calculateCartTotalPrice = require("../middlewares/calculateCartTotalPrice");
const activateTable = require("../middlewares/activateTable");
const decreaseStockAfterOrder = require("../middlewares/decreaseStockAfterOrder");
const applySoldoutItems = require("../middlewares/applySoldoutItems");

const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/")
  .post(
    activateTable,
    insertTableNumber,
    getCartFromMenu,
    calculateCartTotalPrice,
    decreaseStockAfterOrder,
    createNewOrder,
    applySoldoutItems
  );

// -------------- AUTHENCTICATION ROUTES  --------------
// Check if user login or not
router.use(protect);

// -------------- PROTECTED ROUTES  --------------
router.route("/").get(getAllOrders);

router.route("/:id").get(getOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;
