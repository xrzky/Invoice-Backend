function errorMiddleware(error, req, res, next) {
    const errorName = {
        'SequelizeUniqueConstraintError': {
            code: 400,
            message: 'Email already registered'
        },
        'EmailNotFound': {
            code: 401,
            message: 'Email or Password is Wrong'
        },
        'WrongPassword': {
            code: 401,
            message: 'Email or Password is Wrong'
        },
        'PageNotFound': {
            code: 404,
            message: 'Oopss.. Nothing Here'
        },
        'DataNotFound': {
            code: 404,
            message: 'Data Not Found'
        },
        'ProductNotFound': {
            code: 404,
            message: 'Product Not Found'
        },
        'InvoiceNotFound': {
            code: 404,
            message: 'Invoice Not Found'
        },
        'ErrNotFound': {
            code: 404,
            message: 'Cannot delete because data not found'
        },
        'NoAuthorization': {
            code: 401,
            message: 'Unauthorized'
        },
        'Unauthorized': {
            code: 401,
            message: 'Unauthorized'
        },
        'JsonWebTokenError': {
            code: 401,
            message: 'Invalid Token'
        },
        'InvalidToken': {
            code: 401,
            message: 'Invalid Token'
        },
        'cantUpdateProduct': {
            code: 404,
            message: 'cannot update this Products because body data is undefined'
        }
    };

    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((error) => {
            return error.message;
        })
        return res.status(400).json({ message: validationErrors});
    } else {
        const errorResponse = errorName[error.name] || {
            code: 400,
            message: 'Bad Request'
        }
        return res.status(errorResponse.code).json({ message: errorResponse.message });
    }

}

module.exports = errorMiddleware;