const express = require('express');
const router = express.Router();
const axios = require('axios');
const settings = require('../modules/settingsLoader');

/* render hbs based on mapper in settings */
router.get('/:path', function (req, res, next) {
    const path = req.params.path;
    const page = settings.mapping.find(m => m.path === path);

    if (!page) {
        res.status(404).render('error', {message: `Path ${path} mot found`});
        return;
    }
    if (!page.url) {
        res.status(200).render(page.view, {data: page.data});
        return;
    }

    axios.get(page.url)
        .then(resp => {
            res.status(200).render(page.view, {
                data: page.data,
                resp: resp,
            });
        })
        .catch(err => {
            res.status(400).render('error', {message: err});
        });
});

module.exports = router;