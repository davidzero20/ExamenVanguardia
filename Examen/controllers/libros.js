const {response} = require('express');
const Libro = require('../models/libro');

const getLibros = async(req, res = response) => {
    const linros = await Libro.find();
    res.json({
        ok: true,
        linros
    });
}

const crearLibro = async(req, res = response) => {
    const libro = new Libro(req.body);
    try {
        const LibroGuardado = await libro.save();
        res.json({
            ok: true,
            libro: LibroGuardado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarLibro = async(req, res = response) => {
    const id = req.params.id;

    try {
        const libro = await Libro.findById(id);
        if(!libro){
            return res.status(404).json({
                ok: true,
                msg: 'Libro no encontrado por id'
            });
        }
        const nuevoLibro = {
            ...req.body
        }
        const libroActualizado = await Libro.findByIdAndUpdate(id, nuevoLibro, {new: true});
        res.json({
            ok: true,
            libro: libroActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarLibro = async(req, res = response) => {
    const id = req.params.id;

    try {
        const libro = await Libro.findById(id);
        if(!libro){
            return res.status(404).json({
                ok: true,
                msg: 'Libro no encontrado por id'
            });
        }
        await Libro.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Libro eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getLibros,
    crearLibro,
    actualizarLibro,
    borrarLibro
}
