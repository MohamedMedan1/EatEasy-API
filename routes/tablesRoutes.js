const express = require("express");
const { getAllTables, createNewTable, getTable, updateTable, deleteTable } = require("../controllers/tablesController");
const { protect} = require('../controllers/authController');
const router = express.Router();

// -------------- AUTHENCTICATION ROUTES  --------------
// Check if user login or not
router.use(protect);

// -------------- PROTECTED ROUTES  --------------
router.route("/")
  .get(getAllTables)
  .post(createNewTable);

router.route("/:id")
  .get(getTable)
  .patch(updateTable)
  .delete(deleteTable);

module.exports = router;