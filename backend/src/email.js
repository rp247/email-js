const db = require('./db');

exports.getAll = async (req, res) => {
    console.log("GET ALL");
    console.log("geakjhgkdjhf")
    res.status(200).send();
};

exports.getById = async (req, res) => {
    console.log("GET BY ID");
};

exports.post = async (req, res) => {
    console.log("POST BY ID");
};

exports.put = async (req, res) => {
    console.log("PUT");
};
