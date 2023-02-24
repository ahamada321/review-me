const config = require("../../config");
const moment = require("moment-timezone");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_API_KEY);

exports.sendFormMessage = function (req, res) {
  const { username, email, msg } = req.body;

  if (!username || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide your name and email!" },
      ],
    });
  }

  const sendMsg = {
    to: "info@aeru.me",
    from: {
      name: "レッスンカレンダー問い合わせフォーム",
      email: "info@aeru.me",
    },
    subject: "[" + username + " 様]から以下の問い合わせがきました",
    text:
      "氏名：" +
      username +
      "\n\n" +
      "お問い合わせ内容：" +
      msg +
      "\n\n" +
      "返信先メールアドレス：" +
      email +
      "\n\n",
  };
  sgsMail.send(sendMsg);

  return res.json({ Sent: true });
};
