const { Router } = require("express");
const { check } = require("express-validator");
const { validateDocuments } = require("../middlewares/validate.documents");
const { validateJWT } = require("../middlewares/validate.jwt");
const { isAdminRole } = require("../middlewares/validate.role");


const { postCheese, getCheese } = require("../controllers/cheese.controllers");

const router = Router();


router.get('/', getCheese);
router.post('/', [
    validateJWT,
    check('id', 'ID no valido').isMongoId(),
    check('id').custom(validateDocuments)
], postCheese);

module.exports = router;