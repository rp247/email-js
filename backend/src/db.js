const {Pool} = require('pg');
var bcrypt = require('bcrypt');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.login = async (email, pwd) => {
    const select = 'SELECT pname, hash FROM people';
    const query = {
      text: select
    };
    const {rows} = await pool.query(query);
    for (const row of rows) {
        console.log("Rows ", row);
        console.log("same: ", bcrypt.compareSync(row.pname, row.hash));
    }
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
