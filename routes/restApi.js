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
            record._id = undefined;
            return util.promisify(cb => collection.insert(record, {w: 1}, cb))();
        })
        // socket broadcast
        .then(resp => {
            notifyAll({
                collection: req.params.collection,
                created: (resp instanceof Array) ? resp : [resp],
                changes: [],
                removed: [],
            });
            return resp;
        })
        .then(resp => res.status(200).json(resp))
        .catch(err => handleErrors(err, res));
});

router.put('/:collection/:id', function (req, res, next) {
    getCollection(req)
        .then(collection => {
            const record = req.body;
            const id = parseInt(req.params.id);
            return util.promisify(cb => collection.update({_id: id}, record, cb))()
                .then(numUpdated => {
                    if (numUpdated === 0) {
                        return Promise.reject({
                            message: 'record was not updated',
                        });
                    } else {
                        // return updated record
                        return util.promisify(cb => collection.findOne({_id: id}, cb))();
                    }
                });
        })
        // socket broadcast
        .then(record => {
            notifyAll({
                collection: req.params.collection,
                created: [],
                changes: [record],
                removed: [],
            });
            return record;
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
        // socket broadcast
        .then(numDeleted => {
            if (numDeleted === 1) {
                notifyAll({
                    collection: req.params.collection,
                    created: [],
                    changes: [],
                    removed: [parseInt(req.params.id)],

                });
            }
            return numDeleted
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
        console.error(err);
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

function notifyAll(msg) {
    global.appSocket.sockets.emit('changes channel', msg);
    // const clients = global.appSocket.sockets.clients();
    // console.log('try to send to clients ', clients.length);
    // for ( i = 0; i < clients.length; i++ ) {
    //     clients[i].emit('changes channel', message);
    // }
}

module.exports = router;
