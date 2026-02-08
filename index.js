// classic http server using node js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    // console.log("New Request Received!");
    // console.log(req.url);
    if(req.url === '/favicon.ico'){
        return res.end();
    }

    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    const log = `${Date.now()}: ${req.url} New Request Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
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
