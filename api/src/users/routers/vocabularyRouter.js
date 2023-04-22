const router = require('express').Router();
const vocabularyCtrl = require('../controllers/vocabularyController')

router.route("/vocabulary").get(vocabularyCtrl.getdata)

module.exports = router