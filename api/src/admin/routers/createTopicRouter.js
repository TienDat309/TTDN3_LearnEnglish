const router = require("express").Router();
const createTopicCtrl = require("../controllers/createTopicController");

router.route("/getTopic").get(createTopicCtrl.getTopic);

router.route("/createTopicListening").post(createTopicCtrl.createTopicListening);
router.route("/createTopicReading").post(createTopicCtrl.createTopicReading);
router.route("/createTopicWriting").post(createTopicCtrl.createTopicWriting);
router.route("/createTopicSpeaking").post(createTopicCtrl.createTopicSpeaking);
router.route("/createTopicGrammar").post(createTopicCtrl.createTopicGrammars);
router.route("/createTopicVocabulary").post(createTopicCtrl.createTopicVocabularys);

router.route("/updateTopicListening").put(createTopicCtrl.updateTopicListening);
router.route("/updateTopicReading").put(createTopicCtrl.updateTopicReading);
router.route("/updateTopicWriting").put(createTopicCtrl.updateTopicWriting);
router.route("/updateTopicSpeaking").put(createTopicCtrl.updateTopicSpeaking);
router.route("/updateTopicGrammar").put(createTopicCtrl.updateTopicGrammars);
router.route("/updateTopicVocabulary").put(createTopicCtrl.updateTopicVocabularys);

router.route("/deleteTopicListening").delete(createTopicCtrl.deleteTopicListening);
router.route("/deleteTopicReading").delete(createTopicCtrl.deleteTopicReading);
router.route("/deleteTopicWriting").delete(createTopicCtrl.deleteTopicWriting);
router.route("/deleteTopicSpeaking").delete(createTopicCtrl.deleteTopicSpeaking);
router.route("/deleteTopicGrammar").delete(createTopicCtrl.deleteTopicGrammars);
router.route("/deleteTopicVocabulary").delete(createTopicCtrl.deleteTopicVocabularys);

module.exports = router;
