const express = require ('express');
const router = require('./routes/index');
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

//CORS permite que un cliente se conecte a un servidor para el intercambio de datos
const cors = require('cors');
// CONECTAR a mongoose

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  
});

//CREAR servidor o app

const app = express();


//Carpeta publica
app.use(express.static('uploads'));


//HABILITAR bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Definir un dominio para permitir el acceso a nuestra API
const whiteList = [process.env.FRONTEND_URL]; 

const corsOptions = {
    origin: (origin, callback) => {
       
        // Revisar si la peticion llega de un servidor en whiteList
        const existe = whiteList.some(dominio => dominio === origin);
        if(existe){
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }

    }
}


//HBILITAR CORS
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // handle OPTIONS method
    if ('corsOptions' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});

// RUTAS de la app

app.use('/', router());


//PUERTOS
const host = process.env.HOST || '0.0.0.0';
const port= process.env.PORT || 5000;

// Iniciar app
app.listen(port, host, () => {
    console.log('Servidor corriendo' );
});