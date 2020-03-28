const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3002;

const server = http.createServer((req, res) => {
            console.log("Request for "+req.url+" by method "+req.method);

            if(req.method == 'GET')
            {
                var fileUrl;
                if(req.url == '/') 
                {
                    fileUrl = '/index.html'
                }
                else
                {
                    fileUrl = req.url;
                }
                var filePath = path.resolve('./public'+fileUrl);
                const fileExt = path.extname(filePath);
                if(fileExt == '.html')
                {
                    fs.exists(filePath, (exists) => {
                        if(!exists){
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'text/html');
                            res.end('<html><h1>Error 404 '+fileUrl+' &nbsp; Not Found<h1></html>');
                            return;
                        }
                        else
                        {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/html');
                            fs.createReadStream(filePath).pipe(res);

                        }
                    });
                }
                else
                {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><h1>Error 404 '+fileExt+' &nbsp; Not Found<h1></html>');
                    return;
                }
            }
            else
            {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><h1>Error 404 '+res.method+' &nbsp; Not Supported<h1></html>');
                return;
            }
})

server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
 });