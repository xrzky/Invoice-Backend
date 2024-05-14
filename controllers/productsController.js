const { Product } = require('./../models/index');
const { convert } = require('./../helpers/rupiah');

class productsController {
    static async createProduct(req, res, next) {
        const { title, price } = req.body;
        const data = { title, price };
        try {
            const products = await Product.create(data);
            if(!products) throw { name: 'SequelizeValidationError'};
            res.status(201).json({
                id: products.id,
                title: products.title,
                price: convert(products.price),
                createdAt: products.createdAt,
                updatedAt: products.updatedAt
            }
            )
        } catch (error) {
            next(error);
        }
    }

    static async getAllProduct(req, res, next) {
        try {
            const products = await Product.findAll();
            if (products.length === 0) throw { name: 'DataNotFound'};
            const data = products.map(products => ({
                id: products.id,
                title: products.title,
                price: convert(products.price),
                createdAt: products.createdAt,
                updatedAt: products.updatedAt
            }))
            res.status(200).json({ products: data})
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        const { id } = req.params;
        try {
            const products = await Product.findByPk(id);
            if (!products) throw { name: 'DataNotFound'};
            res.status(200).json({
                id: products.id,
                title: products.title,
                price: convert(products.price),
                createdAt: products.createdAt,
                updatedAt: products.updatedAt
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateProduct(req, res, next) {
        const { id } = req.params;
        const { title, price } = req.body;
        const data = { title, price };
        try {
            const products = await Product.update(data, { where: { id } });
            res.status(200).json({
                id: products[1][0].id,
                title: products[1][0].title,
                price: convert(products[1][0].price),
                createdAt: products[1][0].createdAt,
                updatedAt: products[1][0].updatedAt,
            })
        } catch (error) {
            next(error);
        }
    }

    static async removeProduct(req, res, next) {
        const { id } = req.params;
        try {
            const products = await Product.destroy({ where: { id } });
            if (!products) throw { name : 'ErrNotFound' };
            res.status(200).json({ message: 'This products has been successfully deleted' })
        } catch (error) {
            next(error)
            // res.status(500).json({ message: error });
        }
    }
}

module.exports = productsController;