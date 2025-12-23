const express = require('express');
const { getAllMenu, createMenuItem, deleteMenuItem, updateMenuItem, getMenuItem} = require('../controllers/menuController');
const calculateTotalPrice = require('../middlewares/calculateTotalPrice');
const { uploadMenuItemImage } = require('../middlewares/uploadImages');
const deleteMenuItemImage = require('../middlewares/removeImages');
const callIngredientsById = require('../middlewares/callIngredientsById');
const insertItemSizes = require('../middlewares/insertItemSizes');
const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/")
  .get(getAllMenu)
  .post(uploadMenuItemImage,insertItemSizes,callIngredientsById,calculateTotalPrice,createMenuItem);

router.route("/:id")
  .get(getMenuItem)
  .patch(uploadMenuItemImage,insertItemSizes,callIngredientsById,calculateTotalPrice, updateMenuItem)
  .delete(deleteMenuItemImage, deleteMenuItem);

module.exports = router;