var express = require('express');
const { storeFile, getFilesByUser, getFileByCode, deleteFileByCode } = require('../controllers/file');
const upload = require('../middlewares/file');
var router = express.Router();

router.post("/uploadFile", upload.single('fileToUpload'), storeFile);
router.post("/getFilesByUserId", getFilesByUser);
router.post("/getFileByCode", getFileByCode);
router.post("/deleteFileByCode", deleteFileByCode);

module.exports = router;
