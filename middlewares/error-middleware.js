function errorMiddleware(error, req, res, next) {
    let code = 500;
    let message = 'Internal Server Error';

    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Bad Request' });
    } else if (error.name === 'EmailNotFound' || error.name === 'WrongPassword') {
        res.status(401).json({ message: 'Email or Password is Wrong' });
    } else if (error.name === 'PageNotFound') {
        res.status(404).json({ message: 'Oopss... Nothing Here'});
    } else if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((error) => {
            return error.message;
        })
        code = 400;
        message = validationErrors;
    }
    return res.status(code).json({ message });
}

module.exports = errorMiddleware;