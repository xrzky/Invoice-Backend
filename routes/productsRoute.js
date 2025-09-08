const productsController = require('./../controllers/productsController');
const authMiddleware = require('./../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', authMiddleware, productsController.getAllProduct);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.removeProduct);

module.exports = router;