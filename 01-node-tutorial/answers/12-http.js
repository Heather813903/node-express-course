const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("Welcome to the home page!");
        res.end();
    } else if ( req.url === '/about') {
        res.write("This is the about page!");
        res.end();
    } else {
        res.write("Page not found"); 
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server listening");
});

    

