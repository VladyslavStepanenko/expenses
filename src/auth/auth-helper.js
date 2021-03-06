const jwt = require('jsonwebtoken');

exports.generateToken = (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = (token) => {
    let data = jwt.verify(token, SALT_KEY);
    return data;
}

exports.authorize = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if(!token) {
        res.status(401).send({
            message: 'No token provided'
        });
    }
    jwt.verify(token, SALT_KEY, (err, decoded) => {
        if(err) {
            res.status(401).send({
                message: 'Invalid token'
            }); 
        }
        next();
    });
}