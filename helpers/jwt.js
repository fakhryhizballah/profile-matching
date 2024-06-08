'use strict'
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const acctoken = function (payload) {
    // return  pool.getConnection();
    console.log(payload);

    // const token = jwt.sign("payload", secretKey, { expiresIn: 60 * 60 });
    return secretKey;
}

module.exports = {
    acctoken,
}