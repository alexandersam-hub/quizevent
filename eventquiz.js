const express = require('express')
const authRouter = require('./routers/authRouters')
const constructorRouter = require('./routers/constructorRouter')
const quizRouter = require('./routers/quizRouter')
const questionRouter = require('./routers/questionRouter')
const completedRouter = require('./routers/completedRouter')
const imageRouter = require('./routers/imagesRouters')
const supportRouter = require('./routers/supportRouter')
const categoryRouter = require('./routers/categoryRouter')
const roomRouter = require('./routers/roomRouter')
const GameSocketController = require('./controllers/GameSocketController')
// const authServices = require('./services/authServices')
const mongoose = require('mongoose')
const fs = require('fs');


const https = require('https');
const cors = require('cors')

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

require('dotenv').config()


const PORT = process.env.PORT || 8011
const PORT_HTTPS = process.env.PORT_HTPPS || 8500
const app = express()

// app.use('/',(req,res)=>{
//     return res.send('Этот сервер работает только в режиме API')
// })

app.use(express.json({ limit: "50mb" }))
app.use(express.static(__dirname+'/public'));
app.use(
    cors({
        // credentials: true,
        // origin: [process.env.URL_CLIENT],
        // optionsSuccessStatus: 200
    })
);
// app.use(require('helmet')());
app.use('/api/auth',authRouter)
app.use('/api/constructor',constructorRouter)
app.use('/api/quiz',quizRouter)
app.use('/api/questions', questionRouter)
app.use('/api/completed', completedRouter)
app.use('/api/image/', imageRouter)
app.use('/api/support/', supportRouter)
app.use('/api/category/', categoryRouter)
app.use('/api/room/', roomRouter)

// createQrCard.createQrCard('user','123')

const start = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        const server = https.createServer(options, app);
        server.listen(PORT_HTTPS)
        GameSocketController.init(server)
        app.listen(PORT,()=>{
            console.log(`start on port ${PORT}`)
        })

        // // https.createServer(options, app).listen(8443);
        // for(let i=200; i<=700;i++){
        //     await authServices.removeUserByUserName('ru_'+i)
        // }


    }
    catch (e) {
        console.log(e)
    }

}

start()