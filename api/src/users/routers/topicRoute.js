const router = require("express").Router();
const topicController = require("../controllers/topicController");

router.route("/topics/dashboard").get(topicController.dashboard);
router.route("/types/:typeSlug/levels/:levelSlug/topics").get(topicController.search);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:slug").get(topicController.get);
router.route("/types/:typeSlug/levels/:levelSlug/topics").post(topicController.create);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:slug").put(topicController.update);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:slug").delete(topicController.remove);

module.exports = router;