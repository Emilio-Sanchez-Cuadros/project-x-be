var express = require("express");
var router = express.Router();
const multer = require("multer");

const userController = require("../controllers/userController.js");

const storage = multer.diskStorage({
  destination: "public/avatars",
  filename: (_req, file, cb) => {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    cb(null, new Date().valueOf() + extension);
  }
});
const upload = multer({ storage }).single("album_image");

router.get("/", userController.list);
router.post("/register", userController.save);
router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.delete);
router.put("/:userId", userController.update);

module.exports = router;
