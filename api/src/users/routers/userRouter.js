const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.route("/login").post(userCtrl.login);
router.route("/register").post(userCtrl.register);
router.route("/update").put(userCtrl.updateUserInfor);
router.post("/activation", userCtrl.activateEmail);
router.post("/refresh_token", userCtrl.getAccessToken);
router.route("/infor").get(auth, userCtrl.getUserInfor);
router.get('/logout', userCtrl.logout)

// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)
module.exports = router;
