const express = require('express');
const { getAllMenu, createMenuItem, deleteMenuItem, updateMenuItem, getMenuItem} = require('../controllers/menuController');
const { protect} = require('../controllers/authController');
const calculateTotalPrice = require('../middlewares/calculateTotalPrice');
const { uploadMenuItemImage } = require('../middlewares/uploadImages');
const deleteMenuItemImage = require('../middlewares/removeImages');
const callIngredientsById = require('../middlewares/callIngredientsById');
const insertItemSizes = require('../middlewares/insertItemSizes');
const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/").get(getAllMenu);
router.route("/:id").get(getMenuItem);

// -------------- AUTHENCTICATION ROUTES  --------------
// Check if user login or not
router.use(protect);

// -------------- PROTECTED ROUTES  --------------
router.route("/")
  .post(uploadMenuItemImage,insertItemSizes,callIngredientsById,calculateTotalPrice,createMenuItem);

router.route("/:id")
  .patch(uploadMenuItemImage,insertItemSizes,callIngredientsById,calculateTotalPrice, updateMenuItem)
  .delete(deleteMenuItemImage, deleteMenuItem);

module.exports = router;