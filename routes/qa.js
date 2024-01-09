const router = require("express").Router();
const { create, read, updateQA, deleteQA } = require("../controllers/qa");
const verifyToken = require("../middleware/verifyToken");

router.route("/create").post(verifyToken, create);

router.route("/:userId/:toolId").get(verifyToken, read);

router.route("/update/:qaId").patch(verifyToken, updateQA);

router.route("/delete/:qaId").delete(verifyToken, deleteQA);

module.exports = router;
