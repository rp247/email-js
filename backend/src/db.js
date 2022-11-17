const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectMails = async (mailbox) => {
    console.log("selectMails");
};

exports.selectMailId = async (id) => {
    console.log("selectmailid");
};

exports.insertMail = async (mail) => {
    console.log("insertMail");
};

exports.putMail = async (id, mbx) => {
    console.log("fromMail");
};

exports.fromMail = async (mailbox, val) => {
    console.log("from mail");
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
