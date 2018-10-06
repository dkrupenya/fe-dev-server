const express = require('express');
const router = express.Router();
const axios = require('axios');
const settings = require('../modules/settingsLoader');

/* render hbs based on mapper in settings */
router.get('/:path', function (req, res, next) {
    const path = req.params.path;
    const page = settings.pages.find(m => m.path === path);

    if (!page) {
        res.status(404).render('error', {message: `Path "${path}" is not found`});
        return;
    }
    if (!page.url) {
        res.status(200).render(page.view, {data: page.data});
        return;
    }

    axios.get(page.url)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject({
                    message: `request to ${page.url} failed`,
                    err: response.data,
                })
            }
            res.status(200).render(page.view, {
                data: page.data,
                resp: response.data,
            });
        })
        .catch(err => {
            res.status(400).render('error', {message: err});
        });
});

module.exports = router;