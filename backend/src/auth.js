const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require('./db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await db.login(email, password);
    if (user) {
        const accessToken = jwt.sign(
            {email: email}, 
            process.env.SECRET, {
              expiresIn: '30m',
              algorithm: 'HS256'
        });
        res.status(200).json({name: user, accessToken: accessToken});
    } else {
        res.status(401).send('Invalid credentials');
    }
};

exports.check = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

