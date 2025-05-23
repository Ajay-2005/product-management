const multer = require('multer');
// Use memory storage for easy buffer access for Cloudinary
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },//3MB 
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

module.exports = upload;
