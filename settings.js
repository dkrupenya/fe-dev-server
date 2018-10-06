const settings = {
    staticPath: 'public',
    viewsPath: 'views',
    partialsPath: 'views/partials',
    dbPath: 'db',
    initialDataPath: 'jsonData',
    dataFiles: [
      'users.json',
      'books.json',
    ],
    mapping: [
        {
            url: ''
        }
    ],
};

module.exports = settings;