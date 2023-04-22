const express = require("express");
const router = express.Router();
const ggMeetCtrl = require("../controllers/ggMeetController");

router.route('/getmeeting')
    .get(ggMeetCtrl.getCallId)

    router.route('/savemeeting')
    .post(ggMeetCtrl.saveCallId)

module.exports = router;
