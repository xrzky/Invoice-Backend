const productsController = require('./../controllers/productsController');

const router = require('express').Router();

router.get('/', productsController.getAllProduct);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.removeProduct);

module.exports = router;