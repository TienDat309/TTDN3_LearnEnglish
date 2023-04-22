const router = require("express").Router();
const levelController = require("../controllers/levelController");

router.route("/types/:typeSlug/levels").get(levelController.search);
router.route("/types/:typeSlug/levels/:slug").get(levelController.get);
router.route("/types/:typeSlug/levels").post(levelController.create);
router.route("/types/:typeSlug/levels/:slug").put(levelController.update);
router.route("/types/:typeSlug/levels/:slug").delete(levelController.remove);

module.exports = router;