require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: getUuid } = require("uuid");

const bucket = "langsam-involve";

const s3Config = new aws.S3({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   bucket: bucket,
});

const getExtension = (imageName) => {
   const index = imageName.lastIndexOf(".");
   const type = imageName.slice(index);
   return type;
};

const multerS3Config = multerS3({
   s3: s3Config,
   bucket: bucket,
   contentType: multerS3.AUTO_CONTENT_TYPE,
   key: (req, file, cb) => {
      const extension = getExtension(file.originalname);
      const imageName = `${file.fieldname}-${getUuid()}${extension}`;
      cb(null, imageName);
   },
});

const fileFilter = (req, file, cb) => {
   //    console.log("file:", file);

   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
   } else {
      cb(new Error("Image must be jpeg or png"));
   }
};

const upload = multer({
   storage: multerS3Config,
   fileFilter: fileFilter,
   limits: {
      //equates to 5mb
      fileSize: 1024 * 1024 * 5,
   },
});

module.exports = upload;
