const { Router } = require("express");
const { check } = require("express-validator");
const { validateDocuments } = require("../middlewares/validate.documents");
const { validateJWT } = require("../middlewares/validate.jwt");
const { isAdminRole } = require("../middlewares/validate.role");


const { postCheese, getCheese, putCheese, deleteCheese } = require("../controllers/cheese.controllers.js");

const router = Router();


router.get('/', getCheese);
router.post('/', [
    validateJWT,
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(validateDocuments)
], postCheese);
router.put('/:id', [
    validateJWT,
    check('id', 'ID no valido').isMongoId(),
    validateDocuments
], putCheese);
router.delete('/:id', [
    validateJWT,
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(validateDocuments)
], deleteCheese)

module.exports = router;