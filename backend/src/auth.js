const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const db = require('./db')

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login: User: ", email, ". Pwd: ", password);
    const user = db.login(email, process.env.SECRET);
    res.status(401).send('Invalid credentials');
};

exports.check = (req, res, next) => {
    console.log("check");
};

