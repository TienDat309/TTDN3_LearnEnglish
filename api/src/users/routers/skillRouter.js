const router = require("express").Router();
const skillCtrl = require("../controllers/skillController");

router.route("/skills").get(skillCtrl.getAllSkill);
router.route("/listening").get(skillCtrl.getdataListen);
router.route("/writing").get(skillCtrl.getdataWriting);
router.route("/speaking").get(skillCtrl.getdataSpeaking);
router.route("/reading").get(skillCtrl.getdataReading);

module.exports = router;
