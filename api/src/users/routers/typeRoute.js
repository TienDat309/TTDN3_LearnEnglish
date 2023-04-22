const router = require("express").Router();
const typeController = require("../controllers/typeController");

router.route("/types").get(typeController.search);
router.route("/types/:slug").get(typeController.get);
router.route("/types/:slug").put(typeController.update);

module.exports = router;