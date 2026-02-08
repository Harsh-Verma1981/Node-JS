// http methods in node js server..

/* 
1. Get - to get/retrieve the data from the server
2. Post - to put/insert some data in the server
3. Put - to put/upload something on server like photo, file etc.
4. Patch - to update the data of existing user in the server
5. Delete - to delete some data in the web server
*/

// classic http server using node js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log("New Request Received!");
    // console.log(req.url);
    if(req.url === '/favicon.ico'){
        return res.end();
    }

    const myUrl = url.parse(req.url, true);

    const log = `${Date.now()}: ${req.method} : ${req.url} New Request Received\n`;
    fs.appendFile('test.txt', log, (err, data) => {
        if(!err){
            // res.end('Hello from the Server!');

            switch(myUrl.pathname){

                case '/':
                    res.end('Hello Home Page!');
                    break;

                case '/about':
                    const username = myUrl.query.name;
                    res.end(`Hello, ${username}`);
                    break;

                case '/search':
                    const search = myUrl.query.search_query;
                    res.end(`You have search for ${search}`);
                    break;

                case '/signup':
                    if(req.method === 'GET'){
                        res.end('This is a signup form');
                    }
                    else if(req.method === 'POST'){
                        req.end('Success! Your details is send to the database.');
                    }
                    break;

                default:
                    res.end('404 Page not found!');
                    break;
            }
        }

    })
});

server.listen(8000, () => {
    console.log('Server Started!');
})
