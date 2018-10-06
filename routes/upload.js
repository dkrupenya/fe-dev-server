const express = require('express');
const router = express.Router();

const settings = require('../modules/settingsLoader');

/* Rest api generator for collections */
router.post('/', function (req, res, next) {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.file;
    if (!file) {
        return res.status(400).send('use <input type="file" name="file" /> to upload file (name must be "file")');
    }

    // Use the mv() method to place the file somewhere on your server
    file.mv(settings.fileUploadPath + '/' + file.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).send('File uploaded');
    });
});

module.exports = router;