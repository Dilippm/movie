const multer = require('multer');
const fs = require('fs');
const path = require('path');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

// Profile images

const imagesDirectory = path.join(__dirname, '../public/images');

if (!fs.existsSync(imagesDirectory)) {
  fs.mkdirSync(imagesDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, imagesDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadOptions = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!FILE_TYPE_MAP[file.mimetype]) {
      const error = new Error('Invalid image type');
      error.status = 400;
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = { uploadOptions };
