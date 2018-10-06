const settings = {
    staticPath: 'public',
    viewsPath: 'views',
    partialsPath: 'views/partials',
    dbPath: 'db',
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
    pages: [
        {
            path: 'books',
            view: 'books',
            data: {},
            url: 'http://localhost:3000/api/books',
        },
        {
            path: 'book',
            view: 'book',
            data: {},
            url: 'http://localhost:3000/api/books/2',
        },
        {
            path: 'quakes',
            view: 'quakes',
            data: {
                title: 'All earthquakes happens 01.01.2017',
            },
            url: 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-01-01&endtime=2017-01-02',
        },
    ],
};

module.exports = settings;