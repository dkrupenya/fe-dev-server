const settings = {
    staticPath: './public',
    templatesPath: './views',
    dbPath: './db',
    initialDataPath: './jsonData',
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