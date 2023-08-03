const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { getCategoria, postCategoria, putCategorias, deleteCategorias
      } = require('../controllers/categoria.controllers.js');
const { isAdminRole } = require('../middlewares/validate.role.js');


const router = Router();

/**
 * localhost/api/categorias
 */





// Crear categoria - privado - cualquier persona con un token válido
router.get('/', getCategoria);
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments,
    check('id').custom(validateDocuments)
], postCategoria );
router.put('/put/:id', [ 
      validateJWT, 
       check('id','ID no valido').isMongoId(),
       check('id').custom(validateDocuments)
   ], putCategorias);
router.delete('/del/:id', [
      validateJWT,
      check('id', 'ID no valido').isMongoId(),
      check('id').custom(validateDocuments)
], deleteCategorias);







module.exports = router;