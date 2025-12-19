const express = require('express');
const { getAllMenu, createMenuItem, deleteMenuItem, updateMenuItem, getMenuItem} = require('../controllers/menuController');
const calculateTotalPrice = require('../middlewares/calculateTotalPrice');
const { uploadMenuItemImage } = require('../middlewares/uploadImages');
const parseStringFields = require('../middlewares/parseStringFields');
const deleteMenuItemImage = require('../middlewares/removeImages');
const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/")
  .get(getAllMenu)
  .post(uploadMenuItemImage,parseStringFields,calculateTotalPrice,createMenuItem);

router.route("/:id")
  .get(getMenuItem)
  .patch(uploadMenuItemImage, parseStringFields, calculateTotalPrice, updateMenuItem)
  .delete(deleteMenuItemImage, deleteMenuItem);

module.exports = router;