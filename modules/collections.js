const Engine = require('tingodb')();
const path = require('path');
const fs = require('fs');
const settings = require('./settingsLoader');

const dbPath = settings.dbPath;
const db = new Engine.Db(dbPath, {});

const collectionsMap = {};

function initCollections() {
    const collections = settings.collections;

    if (!collections || !collections.length) {
        console.log('No collections declared');
        return;
    }

    collections.forEach(collection => {
        collectionsMap[collection.name] = createCollection(collection);
    });
}

function createCollection(collection) {
    const collectionFilePath = path.join(settings.dbPath, collection.name);
    const collectionFileExists = fs.existsSync(collectionFilePath);

    const dbCollection = db.collection(collection.name);

    // don't modify existing collection
    if (collectionFileExists) {
        console.log(`Collection ${collection.name} exists and was not updated`);
        return dbCollection;
    }

    // fill collection with initial data
    const dataPath = path.join(settings.settingsDir, collection.initialData);
    const collectionDataExists = fs.existsSync(dataPath);
    if (collectionDataExists) {
        const data = require(dataPath);
        dbCollection.insert(data, {w: 1}, (err, result) => {
            if (err) {
                console.warn(`Collection ${collection.name} was not populated with data`);
                return;
            }
            console.log(`Collection ${collection.name} was populated with data`);
        });
    } else {
        console.warn(`Can't find file: ${dataPath}`);
    }

    return dbCollection;
}

module.exports = {
    map: collectionsMap,
    init: initCollections,
};