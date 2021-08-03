const path = require('path');
const multer = require('multer');
require('dotenv').config();

const TEMP_DIR = path.resolve(process.cwd(), process.env.TEMP_DIR);

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, TEMP_DIR);
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage, 
  limits: {fileSize: 2000000},
  fileFilter: (_, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;