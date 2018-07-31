const jwt = require('jsonwebtoken');

const SALT_KEY = 'lalalala'

exports.generateToken = (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = (token) => {
    let data = await jwt.verify(token, SALT_KEY);
    return data;
}