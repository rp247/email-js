const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// const secrets = require('../data/secrets');
// var users = require('../data/users.json');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login: User: ", email, ". Pwd: ", password);
};

exports.check = (req, res, next) => {
    console.log("check");
};
