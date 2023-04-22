const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.route("/types/:typeSlug/levels/:levelSlug/topics/:topicSlug/tasks").get(taskController.search);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:topicSlug/tasks/:slug").get(taskController.get);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:topicSlug/tasks").post(taskController.create);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:topicSlug/tasks/:slug").put(taskController.update);
router.route("/types/:typeSlug/levels/:levelSlug/topics/:topicSlug/tasks/:slug").delete(taskController.remove);

module.exports = router;