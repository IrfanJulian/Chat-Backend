/* eslint-disable no-undef */
require('dotenv').config()
const express = require("express");
const jwt = require('jsonwebtoken')
const {Server} = require('socket.io')
const http = require('http')
const app = express();
const httpServer = http.createServer(app);
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors')
const mainRouter = require('./src/routes/index')
const PORT = 7878
const chatModel = require('./src/models/chat')
const moment = require('moment')
moment.locale('id'); 

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(helmet());
app.use(cors())
app.use(xss());
app.use(morgan('dev'));
app.use('/', mainRouter);

const io = new Server(httpServer,{
    cors: {
        origin: `https://funtalks.netlify.app`
    }
})

io.use((socket, next)=>{
    const token = socket.handshake.query.token;
    jwt.verify(token, process.env.JWT, function(error, decoded){
        if(error){
            if(error && error.name == 'JsonWebTokenError'){
                return response(res, null, 'failed', 404, 'Invalid Token')
            } else if (error && error.name == 'TokenExpriredError'){
                return response(res, null, 'failed', 404, 'Token Expired')
            } else {
                return response(res, null, 'failed', 404, 'Invalid Token')
            }
        }
        socket.idUser = decoded.id;
        socket.join(decoded.id);
        next();
    });
})

io.on(`connection`, (socket)=>{
    // console.log(`device connect id ${socket.id}`);
    socket.on(`msg`, ({idReciever, messageSend}, callback)=>{
        const message = {reciever: idReciever, message: messageSend, sender: socket.idUser, date: new Date()}
        callback({...message, date: moment(message.date).format('LT')})
        chatModel.insert(message)
        .then(()=>{
            socket.broadcast.to(idReciever).emit('newMsg', message)
        })
        .catch((err)=>{
            console.log(err);
        })
        // console.log(message);
    })
    socket.on(`disconnect`, ()=>{
        // console.log(`device disconnect id ${socket.idUser}`);
    })

    socket.on('initRoom', ({room, username})=>{
        // console.log(room)
        socket.join(`room:${room}`)
        io.to(`room:${room}`).emit('notif', {
            sender: `admin`,
            message: `${username} bergabung dalam group`,
            date: new Date().getHours()+':'+new Date().getMinutes()
        })
    })

    socket.on('msgGroup', ({room, sender, message})=>{
        io.to(`room:${room}`).emit('newMsgGroup', {
            sender: sender,
            message: message,
            date: new Date().getHours()+':'+new Date().getMinutes()
        })
    })

})

app.all('*', (req, res) => {
    res.status(404).json({message: 'Server Not Found'})
});

httpServer.listen(PORT, ()=>{
    console.log(`app running on ${PORT}`)
});