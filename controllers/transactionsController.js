const { Transaction, invoiceItem, Product, User } = require('./../models/index');
const { convert } = require('./../helpers/rupiah');

class transactionsController {
    static async createTransaction(req, res, next) {
        const { items } = req.body;
        const UserId = req.user.id;
        try {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const randomGenerate = Math.floor(Math.random() * 100000000);
            const generateNumber = `INV/${year}${month}${day}/LTE/${randomGenerate}`;
            const due_Date = new Date(date);

            const data = {
                invoiceNumber: generateNumber,
                dueDate: due_Date.setDate(date.getDate() + 1),
                UserId
            }

            const transactions = await Transaction.create(data);
            if (!transactions) throw { name: 'SequelizeValidationError' };
            let total = 0;

            for (const item of items) {
                const product = await Product.findOne({ where: { id: item.ProductId } });
                if (!product) throw { name: 'ProductNotFound' };

                const invoice = await invoiceItem.create({
                    TransactionId: transactions.id,
                    ProductId: item.ProductId,
                    quantity: item.quantity
                });

                if (!invoice) throw { name: 'SequelizeValidationError' };

                total += product.price * item.quantity;
            }

            transactions.total_price = total;
            await transactions.save();

            res.status(201).json({
                Message: 'You have successfully purchase the product',
                transactionHistory: {
                    id: transactions.id,
                    invoiceNumber: transactions.invoiceNumber,
                    dueDate: transactions.dueDate,
                    UserId: transactions.UserId,
                    total_price: convert(transactions.total_price)
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async getTransaction(req, res, next) {
        try {
            const UserId = req.user.id;
            const transactions = await Transaction.findAll({
                where: { UserId },
                include: [{
                    model: invoiceItem,
                    attributes: ['id', 'ProductId', 'quantity'],
                    include: [{
                        model: Product,
                        attributes: ['title', 'price']
                    }]
                },
                {
                    model: User,
                    attributes: ['fullname', 'email']
                }]
            });
            if (transactions.length === 0) throw { name: 'DataNotFound' };
            res.status(200).json({
                transactionHistories: transactions
            })
        } catch (error) {
            next(error);
        }
    }

    static async getTransactionById(req, res, next) {
        const TransactionId = req.params.id;
        const UserId = req.user.id;
        try {
            const transactions = await Transaction.findOne({
                where: { id: TransactionId, UserId }
            });
            if (!transactions || transactions.UserId !== UserId) throw { name: 'InvoiceNotFound' };
            res.status(200).json({
                transactionHistory: {
                    id: transactions.id,
                    invoiceNumber: transactions.invoiceNumber,
                    dueDate: transactions.dueDate,
                    UserId: transactions.UserId,
                    total_price: convert(transactions.total_price)
                }
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateTransaction(req, res, next) {
        const { items } = req.body;
        const TransactionId = req.params.id;
        const UserId = req.user.id;
        try {
            const transactions = await Transaction.findOne({
                where: {
                    id: TransactionId,
                    UserId
                }
            });
            if (!transactions || transactions.UserId !== UserId) throw { name: 'InvoiceNotFound' };

            let total = 0;

            await invoiceItem.destroy({ where: { TransactionId } })

            for (const item of items) {
                const product = await Product.findOne({ where: { id: item.ProductId } })
                if (!product) throw { name: 'ProductNotFound' };

                const invoice = await invoiceItem.create({
                    TransactionId: transactions.id,
                    ProductId: item.ProductId,
                    quantity: item.quantity
                });
                if (!invoice) throw { name: 'SequelizeValidationError' };

                total += product.price * item.quantity;
            }

            transactions.total_price = total;
            await transactions.save();

            res.status(200).json({
                Message: 'Transaction updated successfully',
                transactionHistory: {
                    id: transactions.id,
                    invoiceNumber: transactions.invoiceNumber,
                    dueDate: transactions.dueDate,
                    UserId: transactions.UserId,
                    total_price: convert(transactions.total_price)
                }
            })

        } catch (error) {
            next(error);
        }
    }

    static async removeTransaction(req, res, next) {
        const TransactionId = req.params.id;
        const id = TransactionId;
        const UserId = req.user.id;
        try {
            const transactions = await Transaction.findByPk(id);
            if (!transactions || transactions.UserId !== UserId) throw { name: 'InvoiceNotFound' };
            await invoiceItem.destroy({ where: { TransactionId: transactions.id } });
            await transactions.destroy();
            res.status(200).json({ message: `Invoice with id ${id} deleted successfully` })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = transactionsController;