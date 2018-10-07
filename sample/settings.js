// Все пути указываются относительно расположения файла settings.js

const settings = {
    // файлы в этой папке и её подпапках отдаются как обычные статические файлы
    // и доступны по адресу http://localhost:3000/имя_файла
    staticPath: 'public',

    // в эту папку будут сохраняться файлы при загрузке их на сервер
    // лучше, чтобы эта папка находилась внутри пути для статических файлов
    // тогда загруженные файлы будут доступны для чтения снаружи
    fileUploadPath: 'public/uploaded',

    // путь до шаблонов handlebars
    viewsPath: 'views',

    // путь до блоков (handlebars partials)
    partialsPath: 'views/partials',

    // в этой папке будут храниться коллекции документов
    dbPath: 'db',

    // конфигурирование коллекций документов
    collections: [
        {
            // название коллекции
            name: 'books',
            // файл для инициализации коллекции
            initialData: 'jsonData/books.json',
        },
        {
            // коллекция с названием users  - это специальная коллекция
            // которая в дальнейшем будет использоваться для аутентификации
            name: 'users',
            initialData: 'jsonData/users.json',
        },
    ],

    // кофигурирование связи между шаблоном handlebars,
    // данными и пути, по которому это всё показывать
    pages: [
        {
            // показывать view по адресу http://localhost:3000/hbs/books
            path: 'books',
            // рендерить шаблон /views/books
            view: 'books',
            // Эти данный будут доступны в шаблоне как {{ data.title }}
            data: {
                title: 'List of Books'
            },
            // результаты выполнения запроса будут доступны в шаблоне как {{resp}}
            // ожидается, что запрос возвращает json
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