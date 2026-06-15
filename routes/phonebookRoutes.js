const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

const {
  getPhonebooks,
  createPhonebook,
  getPhonebook,
  updatePhonebook,
  deletePhonebook,
  uploadAvatar,
} = require(
  "../controllers/phonebookController"
);

router.get(
  "/",
  getPhonebooks
);

router.post(
  "/",
  createPhonebook
);

router.get(
  "/:id",
  getPhonebook
);

router.put(
  "/:id",
  updatePhonebook
);

router.delete(
  "/:id",
  deletePhonebook
);

router.put(
  "/:id/avatar",
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;