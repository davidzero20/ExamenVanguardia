//Importacion
const mongoose = require('mongoose');

//crear funcion para conectar a la base de datos
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}










