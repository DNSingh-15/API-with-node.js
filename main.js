const request = require('request');
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    const url = req.url;
    if(url === "/"){
        res.writeHead(200,{"content-type":"text/html"});
        res.write("<h1>hello there welcome to custom api</h1><p>Please hit this api to get response : <a href='http://localhost:4000/fakeapi'>localhost:4000/fakeapi</a></p>"); //write a response
        res.end(); //end the response
    }
    else if(url === "/fakeapi"){
        request("https://jsonplaceholder.typicode.com/posts",(error,response,body)=>{
            if (error) {
                const payload = {
                    success:false,
                    endpoint:"https://jsonplaceholder.typicode.com/posts",
                    Error:error
                }
                res.writeHead(500,{"content-type":"application/json"});
                res.write(JSON.stringify(payload));
                res.end();
            }else{
                const payload = {
                    success:true,
                    endpoint:"https://jsonplaceholder.typicode.com/posts",
                    response_code:response.statusCode,
                }
                res.writeHead(200,{"content-type":"application/json"});
                res.write(JSON.stringify(payload));
                res.end();
            }
        })
    }
    else{
        res.writeHead(200,{"content-type":"text/html"});
        res.write("No data found"); //write a response
        res.end(); //end the response
    }
}).listen(4000, function () {
    console.log("server start at port 4000"); //the server object listens on port 3000
});