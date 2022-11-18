const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require('./db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login: User: ", email, ". Pwd: ", password);
    const user = await db.login(email, password);
    if (user) {
        console.log("user auth: ", user);
        const accessToken = jwt.sign(
            {email: user}, 
            process.env.SECRET, {
              expiresIn: '30m',
              algorithm: 'HS256'
        });
        res.status(200).json({email: user, accessToken: accessToken});
    } else {
        console.log("Undefined.")
        res.status(401).send('Invalid credentials');
    }
};

exports.check = (req, res, next) => {
    console.log("check");
};

