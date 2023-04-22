const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentController");

router.route("/payment").post(paymentCtrl.saveData);
router.route("/getpayment").get(paymentCtrl.getData);


module.exports = router;