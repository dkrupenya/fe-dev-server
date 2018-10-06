const express = require('express');
const router = express.Router();
const collections = require('../modules/collections');

/* GET users listing. */
router.get('/:path', function(req, res, next) {
    const format = req.params.path;
    // collections.map.booksCollection.findOne({id: "1"}, function(err, item) {
    //     if (err) {
    //         res.render('error', { error: err });
    //         return;
    //     }
    //     res.render('book', { resp: item });
    //     // res.status(200).send('respond with a resource ' + format + ' ' + JSON.stringify(item));
    // });
    res.render('book', { resp: null });
    // res.status(200).send('test');

});

module.exports = router;