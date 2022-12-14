const fileS = require("../models/fileS");

exports.storeFile = (req, res) => {
    const { userId } = req.body;
    const file = new fileS({
        file: req.file.path,
        name: req.file.originalname,
        userId: userId,
        productCode: Math.floor(100000 + Math.random() * 900000),
    });
    file.save().then((data) => {
        res.json({
            fileData: data
        })
    }).catch((err) => {
        return res.status(400).json({
            message: "File cannot store"
        })
    });
}

exports.getFilesByUser = (req, res) => {
    fileS.find({ userId: req.body.userId }, (err, data) => {
        if (data.length) {
            res.json({
                files: data
            });
        } else {
            return res.status(400).json({
                message: "No files found for this user"
            })
        }
    })
}

exports.getFileByCode = (req, res) => {
    fileS.find({ productCode: req.body.fileCode }, (err, data) => {
        if (data.length) {
            res.json({
                file: data,
            })
        } else {
            return res.status(400).json({
                message: "No such file found"
            })
        }
    })
}

exports.deleteFileByCode = (req, res) => {
    fileS.remove({ productCode: req.body.fileCode }, (err, data) => {
        if (err) {
            return res.status(400).json({
                message: "Something went wrong"
            })
        } else {
            res.json({
                message: "deleted successfully"
            })
        }
    })
}