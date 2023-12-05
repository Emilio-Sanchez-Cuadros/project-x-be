var express = require("express");
var router = express.Router();
const multer = require("multer");

const userProfileController = require("../controllers/userProfileController.js");

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

router.post("/save", userProfileController.save);
router.get("/:userProfileId", userProfileController.get);
router.delete("/:userProfileId", userProfileController.delete);
router.put("/:userProfileId", userProfileController.update);

module.exports = router;
