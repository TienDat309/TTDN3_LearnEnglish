const router = require("express").Router();
const bookCtrl = require("../controllers/bookMeetingController");

router.route("/bookingmeeting").post(bookCtrl.saveData);
router.route("/getbookmeeting").get(bookCtrl.getData);
router.route("/suggestion-students").get(bookCtrl.getSuggestionStudentList);
router.route("/test").get(bookCtrl.test);


module.exports = router;