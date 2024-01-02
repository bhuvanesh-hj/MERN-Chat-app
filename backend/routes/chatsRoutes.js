const router = require("express").Router();
const { protect } = require("../middlewares/authMiddlewares");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatsController");

router.route("/").post(protect, accessChats).get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/group_rename").put(protect, renameGroup);
router.route("/group_add").put(protect, addToGroup);
router.route("/group_remove").put(protect, removeFromGroup);

module.exports = router;
