const express = require("express");
const { getAllTables, createNewTable, getTable, updateTable, deleteTable } = require("../controllers/tablesController");

const router = express.Router();

// -------------- MAIN ROUTES  --------------
router.route("/")
  .get(getAllTables)
  .post(createNewTable);

router.route("/:id")
  .get(getTable)
  .patch(updateTable)
  .delete(deleteTable);

module.exports = router;