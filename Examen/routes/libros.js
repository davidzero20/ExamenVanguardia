const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getLibros, crearLibro, actualizarLibro, borrarLibro} = require('../controllers/libros');

const router = Router();

router.get('/', getLibros);

router.post('/', [
    check('NombreLibro', 'El nombre del libro es obligatorio').not().isEmpty(),
    check('Autor', 'El autor es obligatorio').not().isEmpty(),
    check('Stock', 'El stock es obligatorio').not().isEmpty(),
    check('Usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('Editorial', 'La editorial es obligatoria').not().isEmpty(),
    validarCampos
], crearLibro);

router.put('/:id', [
    check('NombreLibro', 'El nombre del libro es obligatorio').not().isEmpty(),
    check('Autor', 'El autor es obligatorio').not().isEmpty(),
    check('Stock', 'El stock es obligatorio').not().isEmpty(),
    check('Usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('Editorial', 'La editorial es obligatoria').not().isEmpty(),
    validarCampos
], actualizarLibro);

router.delete('/:id', borrarLibro);

module.exports = router;