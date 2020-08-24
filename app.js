const express = require('express');
const pageRouter = require('./routes/page');
const newsRouter = require('./routes/news');

const app = express();

app.locals.restUrl = process.env.restUrl;

var users = {};

const server = require('http').createServer(app),
io = require('socket.io').listen(server);

const port = process.env.PORT;
require('./db/db');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/news', pageRouter);
app.use('/api/news', newsRouter);

app.get('/chatGroup',function(req,res){
    res.render('chat');
});

io.sockets.on('connection',function(socket){

    socket.on('new user',function(data, callback){
     
      if(data in users){
        console.log("Username already taken");
        callback(false);
      }
      else{
        console.log("Username available");
        callback(true);

        socket.nickname = data;
        users[socket.nickname] = socket;
        updateNicknames();
      }
    });

    function updateNicknames(){
      io.sockets.emit('usernames', Object.keys(users) );
    }

    socket.on('send message',function(data,callback){
      var msg = data.trim();
      console.log("Got Message :"+data)
      io.sockets.emit('new message',{msg:msg,nick:socket.nickname});
    });

    socket.on('disconnect',function(data){
          if(!socket.nickname) return;
          delete users[socket.nickname];
          updateNicknames();
    });
});

server.listen(port, '127.0.0.1');
