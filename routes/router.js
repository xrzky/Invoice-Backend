const router = require('express').Router();
const errorMiddleware = require('../middlewares/error-middleware');
const usersRoutes = require('./usersRoute');
const ProductsRoute = require('./productsRoute');
const TransactionsRoute = require('./transactionsRoute');

router.use('/users', usersRoutes);
router.use('/products', ProductsRoute);
router.use('/transactions', TransactionsRoute);

router.use((req, res, next) => {
    next({ name: 'PageNotFound' });
})

router.use(errorMiddleware);

module.exports = router;