const express = require('express');     //через require импортировали фреймворк express

const fs = require('fs');   //встроенный модуль fs - для работы с файлами в Node.js (файловой системой)
const app = express();      //создаем объект app со свойствами и методами (конструктора) express()
const cart = require('./cartRouter');   //локальный (не внешний) модуль cartRouter из текущей папки

app.use(express.json());    //указываем, что используем в этом проекте json (активируем json)
app.use('/', express.static('public')); //при открытии глав.страницы сообщаем открыть статическую страницу
app.use('/api/cart', cart);    //при открытии url с адресом '/api/cart' запускаем модуль cart (строка 5 здесь)

//указываем путь - папку 'public'/ если файл называется не index, необходимо указать имя файла (index.html - всегда главный файл)
//у нас всего 2 пути: главная страница '/'  и  '/api/cart'

app.get('/api/products', (req, res) => {        //по умолчанию возвращаем data - наши товары
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {    //readFile - считываем данные с файла products.json
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);     //send - выводим на экран данные файла products.json
        }
    })          //с помощью req получаем get-параметры (id)
});             //с помощью res отправляем ответ на сервер

const port = process.env.PORT || 3000;  //указываем по умолчанию порт 3000
app.listen(port, () => console.log(`Listen on port ${port}...`));   //слушаем порт 3000



// server.js - это рутер - этой файл, который обрабатывает все запросы
// 4 основных запроса:
// app.get();   - получение данных
// app.post();  - добавление данных
// app.put();   - изменение данных
// app.delete();

// 4 основные функции постоянного хранения - конструкция CRUD (Create, read, update, delete)
// создание
// считывание
// обновление
// удаление

//ключевые файлы: server и cartRouter-----------------------------------------------------------------------------------

//каталог товаров
//корзина
//админка для управления вашими товарами и заказами
//верстка + внедрить vue.js и серверную часть node.js

//статистика действий корзины?------------------------------------------------------------------------------------------

//express – фреймворк, с его помощью можно создать полноценный сервер, умеющий принимать запросы, обрабатывать их, обращаться к базе данных и т. д.
//static - простой сервер, который отдаёт статичные данные, и все запросы которого будут обрабатываться модулем node-static
//nodemon - глобальный модуль монитора, чтобы не перезапускать наш сервер, чтобы он видел обновления
//cartRouter - модуль - обработчик всех запросов
//moment - пакет с отображением текущей даты/времени

//const moment = require('moment');
//console.log(moment().format(format: 'D MMMM YYYY, h:mm:ss a'));
// March 15th 2020, 3:17:02 pm


//*exports- экспорт модуля       *require - импорт модуля

//module.exports.func = a;   - экспорт и импорт в разных файлах
//const c = require('./func')  - импорт локадьного модуля, где  ./ - текущая папка, func - имя файла func.js
//при экспорте внешнего модуля (не локального) пишем без слэша '/' : require('fs')
//при экспорте данных всегда указываем относительный путь
//  ../  - на уровень выше
//   ./  - текущая папка
//    /  - главная страница


/*
const http = require('http');
const server = http.createServer((req,res) => {        //require - запрос, response - ответ(отправка данных)
    if(req.url === '/') {
    res.write('hello, world!'); //вывод сообщения в браузере
    res.end();  //закрываем сервер
    }
})

server.on('connection', (socket) => {    //connection - событие,  socket - канал связи без перезагрузки странички - механизм ajax
    console.log("New connection");
});

server.listen(3000);
console.log("New connection on port 3000"); */

//все современные чаты основаны на socket
//можно сделать онлайн-аукцион, необходимо будет применить socket
//socket решает асинхронные задачи
//socket - механизм, с помощью которого браузер (клиент) и сервер общаются без создания новых запросов, т.е. онлайн


//в браузере в инстр.разраб. открываем вкладку Network, нажимаем из списка cart или products и смотрим все запросы на сервере

//Node.js - интерпретатор

//устанавливаем "npm i express" - фреймворк
// !папку node_modules не прикладывать к проекту в git-репозиторий, т.к. у каждого она своя на компе (применять команду git ignore)
//устанавливаем "npm i nodemon -g"  // g - глобальный, везде доступный
