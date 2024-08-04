import multer from "multer";

// create a middleware to  use the multer  before  save the data into cloudinary 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/temp')
    },

    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage})