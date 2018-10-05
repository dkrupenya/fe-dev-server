const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:path', function(req, res, next) {
    const format = req.params.path;
    res.status(200).send('respond with a resource ' + format);

});

module.exports = router;