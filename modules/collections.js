const Engine = require('tingodb')();

class Collections {
    constructor() {
        const db = new Engine.Db('./db', {});
        const booksCollection = db.collection("booksCollection");

        const books = require('../jsonData/books');

        booksCollection.insert(books, {w:1}, function(err, result) {
            console.log('insert', err, result);
        });

        this.map = {
            booksCollection: booksCollection,
        };
    }
};

module.exports = new Collections();