const multer = require('multer')

const upload = multer({
    limits: { fileSize: 10 * Math.pow(1024, 2 /* MBs*/) },
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      // console.log('bentuk '+ req);
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jfif') {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Just allowed png and jpg type'));
      }
    },
});

module.exports = upload