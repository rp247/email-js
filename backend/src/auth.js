const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require('./db')

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login: User: ", email, ". Pwd: ", password);
    const user = await db.login(email, password);
    if (user) {
        console.log("user auth: ", user);
        res.status(200).json({name: user.email, "bruh": "bruh"});
    }
    else {
        res.status(401).send('Invalid credentials');
    }
};

exports.check = (req, res, next) => {
    console.log("check");
};

