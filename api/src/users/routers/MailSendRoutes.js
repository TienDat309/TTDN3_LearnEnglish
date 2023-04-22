const router = require("express").Router();
const sendmailCtrl = require("../MailService/MailserviceController");

router.route("/mail-student").post(sendmailCtrl.sendMailNoteMeeting);
router.route("/mail-lecture").post(sendmailCtrl.sendMailToLecture);
router.route("/reset-email").post(sendmailCtrl.confirmResettingEmail);


module.exports = router;