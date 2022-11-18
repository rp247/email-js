const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.login = async (email, hash) => {
    console.log("login database check email", email, ". hash: ", hash);
    const select = 'SELECT hash FROM people WHERE email = $1';
    const query = {
      text: select,
      values: [email],
    };
    const {rows} = await pool.query(query);
    console.log("Rows ", rows[0]);
    return rows.length == 1 ? rows[0].email : undefined;
}

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
