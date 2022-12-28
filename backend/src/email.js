const db = require('./db');

// https://gist.github.com/johnelliott/cf77003f72f889abbc3f32785fa3df8d
const temp =
['^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-',
  '[89AB][0-9A-F]{3}-[0-9A-F]{12}$'].join('');
const uuidReg = new RegExp(temp, 'i');

exports.getAll = async (req, res) => {
  const from = req.query.from;
  let re;
  const mbx = req.query.mailbox;
  if (from !== undefined) re = await db.fromMail(mbx, from);
  else re = await db.selectMails(mbx);
  if (re.length === 0) {
    res.status(404).send();
  } else {
    res.status(200).send(re);
  }
};

exports.getById = async (req, res) => {
  const id = req.params.id;
  if (!id.match(uuidReg)) {
    res.status(404).send();
    return;
  }
  const mail = await db.selectMailId(id);
  if (mail === undefined) {
    res.status(404).send();
  } else {
    res.status(200).json(mail);
  }
};

exports.post = async (req, res) => {
  const date = new Date().toISOString();
  mail = {
    'to': {
      'name': req.body.to.name,
      'email': req.body.to.email,
    },
    'from': {
      'name': 'CSE186 Student',
      'email': 'CSE186student@ucsc.edu',
    },
    'received': date,
    'sent': date,
    'content': req.body.content,
    'subject': req.body.subject,
  };
  const val = await db.insertMail(mail);
  res.status(200).send(val);
};

exports.put = async (req, res) => {
  const id = req.params.id;
  const mbx = req.query.mailbox;
  if (!id.match(uuidReg)) {
    res.status(404).send();
    return;
  }
  const val = await db.putMail(id, mbx);
  res.status(val).send();
};
