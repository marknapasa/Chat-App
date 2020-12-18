var express = require('express');
var http = require('http');
var app = express();
//var bodyParser = require('body-parser');
var httpServer = http.createServer(app);
//var messages = [];
var io = require('socket.io')(httpServer);

//app.get('/', function(req, res) {
//    console.log("Received GET request for resource /");
//    res.sendFile('index.html', { root: __dirname });
//})

//app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log("Received", req.method, "request for resource", req.path, "from", req.ip);
    next(); // callback to the middleware function
});

/*app.post('/newMsg', function(req,res) {
    messages.push(req.body.msg);
    res.send({
        newMessages: messages.slice(req.body.nextIdx),
        nextIdx: messages.length,
        isLastClient: true
    });
});

app.post('/', function(req,res) {
    res.send({
        newMessages:messages.slice(req.body.nextIdx),
        nextIdx: messages.length,
        isLastClient: false
    });
});*/

app.use(express.static('src'));

httpServer.listen(3000, function(){
    console.log("Listening on port 3000");
});

var numClients = 0;
io.on('connection', function(client) {
	console.log('Client', numClients++, 'connected.');
	client.on('join', function(data) {
	console.log(data);
    });
    client.on("chat", function(msg) {
        console.log(msg);
        client.broadcast.emit('chat msg', msg);
    });
});
