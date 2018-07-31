const jwt = require('jsonwebtoken');

const SALT_KEY = 'lalalala'

exports.generateToken = (data) => {
    return jwt.sign(data, SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = (token) => {
    let data = jwt.verify(token, SALT_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token) {
        res.status(401).send({
            status: false,
            message: 'No token provided'
        });
    }
    jwt.verify(token, SALT_KEY, (err, decoded) => {
        if(err) {
            res.status(401).send({
                status: false,
                message: 'Invalid token'
            }); 
        }
        next();
    });
}