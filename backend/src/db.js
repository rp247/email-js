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
    const select = 'SELECT pname, email, hash FROM people WHERE email = $1';
    const query = {
      text: select,
      values: [email]
    };
    const {rows} = await pool.query(query);
    if (rows.length == 0 || !bcrypt.compareSync(pwd, rows[0].hash)) return undefined;
    else return rows[0].pname;
}

exports.selectMails = async (mailbox) => {
  let select = 'SELECT mailbox, ' +
  'ARRAY_AGG (mail::jsonb - \'content\' || ' +
  'jsonb_build_object(\'id\', mail.id)) mail FROM mail';
  if (mailbox) {
    select += ` WHERE mailbox = $1`;
  }
  select += ' GROUP BY mailbox';
  const query = {
    text: select,
    values: mailbox ? [`${mailbox}`] : [],
  };
  const {rows} = await pool.query(query);
  const mails = [];
  for (const row of rows) {
    const vals = Object.values(row.mail);
    mails.push({name: row.mailbox, mail: vals});
  }
  return mails;
};

exports.selectMailId = async (id) => {
  const select = 'SELECT (mail::jsonb || ' +
  'jsonb_build_object(\'id\', mail.id)) mail ' +
  'FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1 ? rows[0].mail : undefined;
};

exports.insertMail = async (mail) => {
  const select = 'WITH res AS ' +
    '(INSERT INTO mail(mailbox, mail)' +
    ' VALUES (\'sent\', \'' + JSON.stringify(mail) + '\')' +
    ' RETURNING id, mail) ' +
    'SELECT (mail::jsonb || jsonb_build_object(\'id\', id)) mail FROM res';
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  return rows[0].mail;
};

exports.putMail = async (id, mbx) => {
  let select = 'SELECT mailbox FROM mail WHERE id = $1';
  let query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  if (rows.length === 0) return 404;
  const mailbox = rows[0].mailbox;
  if (mailbox === mbx) return 204;
  if (mbx === 'sent' && mailbox !== 'sent') return 409;
  select = 'UPDATE mail SET mailbox = $1 WHERE id = $2';
  query = {
    text: select,
    values: [mbx, id],
  };
  await pool.query(query);
  return 204;
};

exports.fromMail = async (mailbox, val) => {
  let select = 'SELECT mailbox, ' +
  'ARRAY_AGG (mail::jsonb - \'content\' || ' +
  'jsonb_build_object(\'id\', mail.id)) mail FROM mail' +
  ' WHERE';
  if (mailbox) {
    select += ` (mailbox = $2) AND`;
  }
  select += ' (mail->\'from\'->>\'name\' ~* $1' +
  ' OR mail->\'from\'->>\'email\' = $1)' +
  ' GROUP BY mailbox';
  const query = {
    text: select,
    values: mailbox ? [val, `${mailbox}`] : [val],
  };
  const {rows} = await pool.query(query);
  const mails = [];
  for (const row of rows) {
    const vals = Object.values(row.mail);
    mails.push({name: row.mailbox, mail: vals});
  }
  return mails;
};


console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
