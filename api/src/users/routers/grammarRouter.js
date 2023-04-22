const router = require("express").Router();
const grammarCtrl = require("../controllers/grammarController");

router.route("/grammar").get(grammarCtrl.getData);

module.exports = router;
