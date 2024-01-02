const router = require("express").Router();
const { protect } = require("../middlewares/authMiddlewares");

// controllers
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;
