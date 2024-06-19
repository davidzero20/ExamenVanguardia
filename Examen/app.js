//Importar libreria express
var express = require('express');

//Crear una instancia de express
var app = express();

require('dotenv').config();

const cors = require('cors');

const { dbConnection } = require('./database/config');

//CORS
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

dbConnection();

//Rutas
app.use('/api/libros', require('./routes/libros'));

//Configurar puerto
app.listen(process.env.PORT, () => {
    console.log('Express server Puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});





