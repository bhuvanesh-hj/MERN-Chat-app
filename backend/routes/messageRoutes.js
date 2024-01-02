const { addMessage, allMessages } = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddlewares");

const router = require("express").Router();

router.route("/").post(protect, addMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
