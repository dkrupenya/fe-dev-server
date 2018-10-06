const express = require('express');
const router = express.Router();
const util = require('util');

const collections = require('../modules/collections');

/* Rest api generator for collections */
router.get('/:collection', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            return util.promisify(cb => collection.find().toArray(cb))();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

router.post('/:collection', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            const record = req.body;
            return util.promisify(cb => collection.insert(record, {w: 1}, cb))();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

router.put('/:collection/:id', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            const record = req.body;
            const id = parseInt(req.params.id);
            return util.promisify(cb => collection.update({_id: id}, record, cb))();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

router.delete('/:collection/:id', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            const id = parseInt(req.params.id);
            return util.promisify(cb => collection.remove({_id: id}, cb))();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

router.get('/:collection/:id', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            const id = parseInt(req.params.id);
            return util.promisify(cb => collection.findOne({_id: id}, cb))();
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

function handleErrors(err, res) {
    if (err instanceof Error) {
        console.err(err);
        res.status(400).json({
            name: err.name,
            message: err.message,
        });
    } else {
        res.status(400).send(err)
    }
}

function getCollection(req) {
    const collectionName = req.params.collection;
    if (!collectionName || !collections.map[collectionName]) {
        return Promise.reject({
            message: `no such collection: ${collectionName}`
        });
    } else {
        return Promise.resolve(collections.map[collectionName]);
    }
}

module.exports = router;
