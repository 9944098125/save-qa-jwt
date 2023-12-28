const router = require("express").Router();
const { create, read, updateQA, deleteQA } = require("../controllers/qa");

router.route("/create").post(create);

router.route("/:userId/:toolId").get(read);

router.route("/update/:qaId").patch(updateQA);

router.route("/delete/:qaId").delete(deleteQA);

module.exports = router;
