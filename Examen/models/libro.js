const {Schema, model} = require('mongoose');

const LibroSchema = Schema({
    NombreLibro: {
        type: String,
        required: true
    },
    Autor: {
        type: String,
        default: ""
    },
    Stock: {
        type: Number,
        required: true
    },
    Usuario: {
        type: String,
        required: true
    },
    Editorial: {
        type: String,
        required: true
    }
});

LibroSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Libro', LibroSchema);