var express = require("express");
var router = express.Router();

var authController = require("../../controllers/admin/authController");
var imoveisController = require("../../controllers/admin/imoveisController");
var authMiddleware = require("../../middlewares/authMiddleware");
var multer = require('multer')
const upload = multer()

router.post("/auth", function (req, res) {
  authController.login(req, res)
});
router.get("/validar", authMiddleware, function (req, res) {
  return res.status(200).json({ user: req.user });
});
router.post("/logout", authMiddleware, function(req, res){
  authController.logout(req, res)
});
router.post("/register", authMiddleware, upload.array('fotos'), function (req, res) {
  imoveisController.register(req, res)
})
router.get("/buscar-imoveis", authMiddleware, function (req, res) {
  imoveisController.buscarImoveis(req, res)
})

router.get("/imovel/:slug", authMiddleware, function (req, res) {
  imoveisController.detalhesImovel(req, res)
})
module.exports = router;





