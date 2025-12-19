const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'eatEasy/menu',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});


const upload = multer({ storage });
exports.uploadMenuItemImage = upload.single("image");

