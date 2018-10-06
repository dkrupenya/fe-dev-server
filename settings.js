const settings = {
    staticPath: 'public',
    viewsPath: 'views',
    partialsPath: 'views/partials',
    dbPath: 'db',
    initialDataPath: 'jsonData',
    collections: [
        {
            name: 'users',
            initialData: 'jsonData/users.json',
        },
        {
            name: 'books',
            initialData: 'jsonData/books.json',
        },
    ],
    mapping: [
        {
            url: ''
        }
    ],
};

module.exports = settings;