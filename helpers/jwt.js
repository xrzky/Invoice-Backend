const jwt = require('jsonwebtoken');

function sign(payload){
    return jwt.sign(payload, process.env.JWT_SECRET);
}

function verify(token){
    return jwt.sign(token, process.env.JWT_SECRET);
}

module.exports = {
    sign,
    verify
}