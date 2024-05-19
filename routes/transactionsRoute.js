const transactionsController = require('./../controllers/transactionsController');
const authMiddleware = require('./../middlewares/auth-middleware');

const router = require('express').Router();

router.get('/', authMiddleware, transactionsController.getTransaction);
router.get('/:id', authMiddleware,  transactionsController.getTransactionById);
router.post('/', authMiddleware, transactionsController.createTransaction);
router.put('/:id', authMiddleware, transactionsController.updateTransaction);
router.delete('/:id', authMiddleware, transactionsController.removeTransaction);

module.exports = router;