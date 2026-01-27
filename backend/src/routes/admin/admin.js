var express = require("express");
var router = express.Router();

var authController = require("../../controllers/admin/auth");
var authMiddleware = require("../../middlewares/authMiddleware");


router.post("/auth", function (req, res) {
  authController.login(req, res);
});
router.get("/validar", authMiddleware, function (req, res) {
  res.status(200).json({ user: req.user });
});



module.exports = router;





