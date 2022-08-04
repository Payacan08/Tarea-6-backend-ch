const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IOServers} = require('socket.io');
const Contenedor = require('./contenedor');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServers(httpServer);
const contenedor = new Contenedor('productos');
const messages = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))


httpServer.listen(8080,()=>console.log("App funcionando"));

io.on('connection', (socket)=>{
    console.log('Nuevo cliente')
    socket.emit('productos',{contenedor:contenedor.getAll(),length: contenedor.length()})
    socket.emit('messages', messages);

    socket.on('newProducto',data=>{
        contenedor.save(data);
        io.sockets.emit('productos',{contenedor:contenedor.getAll(),length: contenedor.length()})
    })

    socket.on('newMessage', data => {
        messages.push(data);
        io.sockets.emit('messages', messages); 
    });
})

app.get('/',(req,res)=>{
    res.sendFile('index.html', {root:__dirname})
})



