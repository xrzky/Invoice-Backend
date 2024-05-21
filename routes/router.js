const router = require('express').Router();
const errorMiddleware = require('../middlewares/error-middleware');
const usersRoutes = require('./usersRoute');
const ProductsRoute = require('./productsRoute');

router.use('/users', usersRoutes);
router.use('/products', ProductsRoute);

router.use((req, res, next) => {
    next({ name: 'PageNotFound' });
})

router.use(errorMiddleware);

module.exports = router;