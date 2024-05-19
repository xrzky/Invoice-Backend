function errorMiddleware(error, req, res, next) {
    let code = 400;
    let message = 'Bad Request';

    if (error.name === 'SequelizeUniqueConstraintError') {
        code = 400;
        message = 'Email already registered';
    } else if (error.name === 'EmailNotFound' || error.name === 'WrongPassword') {
        code = 401;
        message = 'Email or Password is Wrong';
    } else if (error.name === 'PageNotFound') {
        code = 404;
        message = 'Oopss.. Nothing Here';
    } else if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((error) => {
            return error.message;
        })
        code = 400;
        message = validationErrors;
    } else if (error.name === 'DataNotFound') {
        code = 404;
        message = 'Data Not Found';
    } else if (error.name === 'ProductNotFound') {
        code = 404;
        message = 'Product Not Found';
    } else if (error.name === 'InvoiceNotFound') {
        code = 404;
        message = 'Invoice Not Found';
    } else if (error.name === 'ErrNotFound') {
        code = 404;
        message = 'Cannot delete because data not found';
    } else if (error.name === 'NoAuthorization' || error.name === 'Unauthorized') {
        code = 401;
        message = 'Unauthorized'
    } else if (error.name === 'JsonWebTokenError' || error.name === 'InvalidToken') {
        code = 401;
        message = 'Invalid Token';
    } else if (error.name === 'cantUpdateProduct') {
        code = 404;
        message = 'cannot update this Products because body data is undefined';
    }
    return res.status(code).json({ message });
}

module.exports = errorMiddleware;