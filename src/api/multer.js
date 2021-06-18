const multer = require('multer');

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, 'src/uploads'),
    filename: (req, _file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  });

  const upload = multer({ storage });
  return upload.single('image');
};

module.exports = uploadImage;
