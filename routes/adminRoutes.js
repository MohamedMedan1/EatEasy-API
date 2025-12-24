const express = require("express");
const {
  createNewAdmin,
  getAllAdmins,
  getAdmin,
  updateAdmin,
  deactivateAdmin,
  activateAdmin,
  getMe,
} = require("../controllers/adminController");
const insertDeactivationBody = require("../middlewares/insertDeactivationBody");
const { login, protect, updatePassword } = require("../controllers/authController");
const insertActivationBody = require("../middlewares/insertActivationBody");

const router = express.Router();

// ---------  AUTHENTICATION ROUTES  ---------
router.post("/login", login);

// Check if user login or not
router.use(protect);

router.patch("/update-password", updatePassword);

// ---------  USER-PROFILE ROUTES  ---------
router.get("/getMe", getMe);

// ---------  CRUD ROUTES  ---------
router.patch("/deactivateAdmin/:id", insertDeactivationBody, deactivateAdmin);
router.patch("/activateAdmin/:id", insertActivationBody, activateAdmin);

router.route("/").get(getAllAdmins).post(createNewAdmin);

router.route("/:id").get(getAdmin).patch(updateAdmin);

module.exports = router;
