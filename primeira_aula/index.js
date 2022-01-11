const express = require('express');
const path = require('path');
// const http = require('http');
const socketIO = require('socket.io')
const app = express();

const list = ['José', 'Marcos', 'Antônio'];


app.use('/', express.static(path.join(__dirname,'public')))

const server = app.listen(3000, ()=> { // essa função retorna um server
    console.log('running');
})

// outra forma: 

// const server = http.Server(app) // http é quem gerenciará todas as requisições

// server.listen(3000, () => {
//     console.log('running');
// });

const io = socketIO(server) // server vai ser quem está gerenciando as requisições http

io.on('connection', (socket) => { // o socket é a conexão entre o back end e o front end; o socket é como se fosse a representação do navegador, cada navegador que se conectar com o back end
    // ...vai ser um socket diferente

    console.log('New connection');

    socket.emit('hello', {msg: 'seja bem vindo!'})

    socket.on('hello_client_response', (data)=> {
        console.log(data.msg);
    })

});