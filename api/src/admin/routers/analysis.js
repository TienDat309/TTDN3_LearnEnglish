const router = require("express").Router();
const analysisCtrl = require("../controllers/analysisControler");

router.route("/analysisuser").get(analysisCtrl.getDataUser);

module.exports = router;
