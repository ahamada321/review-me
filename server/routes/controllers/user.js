const User = require("./models/user");
const Booking = require("./models/booking");
const Notification = require("./models/notification");
const { normalizeErrors } = require("./helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(config.SENDGRID_API_KEY);

const REQUEST_RECEIVED = "request_received";
const REQUEST_ACCEPTED = "request_accepted";
const REMOVED_RECEIVED = "removed_received";

function sendEmailTo(sendTo, sendMsg, hostname, userData) {
  let msg = {};

  if (sendMsg === REQUEST_RECEIVED) {
    msg = {
      to: sendTo,
      from: {
        name: "レッスンカレンダー",
        email: "info@aeru.me",
      },
      subject: "先生から担当承認リクエストが来ています",
      html:
        "<p>先生から担当承認リクエストが来ています。</p>" +
        "<p><a href=https://" +
        hostname +
        "/#/student/notification" +
        ">こちらからログイン</a>して承認ボタンを押してください。</p>" +
        "<br>" +
        "<p>このメッセージは「レッスンカレンダー」自動配信メールです。</p>",
    };
  } else if (sendMsg === REQUEST_ACCEPTED) {
    msg = {
      to: sendTo,
      from: {
        name: "レッスンカレンダー",
        email: "info@aeru.me",
      },
      subject: "生徒がリクエストを承認しました",
      text:
        "リクエストを送った生徒から予約を受けられるようになりました。\n\n" +
        "このメッセージは「レッスンカレンダー」自動配信メールです。",
    };
  } else if (sendMsg === REMOVED_RECEIVED) {
    msg = {
      to: sendTo,
      from: {
        name: "レッスンカレンダー",
        email: "info@aeru.me",
      },
      subject: userData.username + "先生が担当から外れました",
      text:
        userData.username +
        "先生が担当から外れました。\n" +
        "何かの間違いの場合は先生に直接ご確認ください。\n\n" +
        "このメッセージは「レッスンカレンダー」自動配信メールです。",
    };
  } else {
    return res.status(422).send({
      errors: [
        {
          title: "Could not send email!",
          detail: "Please select appropriate email content!",
        },
      ],
    });
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

exports.getUsers = function (req, res) {
  const { page, limit } = req.query;

  if (page && limit) {
    User.aggregate(
      [
        { $match: { userRole: "User" } }, // Filtering to teachers
        { $project: { password: 0 } }, // Hide sensitive information.
        { $sort: { _id: -1 } }, // Sorting by latest user.
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
            foundUsers: [
              { $skip: (page - 1) * limit },
              { $limit: Number(limit) },
            ],
          },
        },
      ],
      function (err, result) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(result);
      }
    );
  } else {
    User.find({ userRole: "User" })
      // .populate('user') // Need to consider security in future.
      .select("-password")
      .sort({ patientId: -1 })
      .exec(function (err, foundUsers) {
        return res.json(foundUsers);
      });
  }
};

exports.searchUsers = function (req, res) {
  const { searchWords } = req.body;

  User.aggregate(
    [
      { $project: { password: 0 } },
      {
        $match: {
          username: {
            $regex: searchWords,
            $options: "i",
          },
          userRole: "Student",
        },
      },
    ],
    function (err, foundUsers) {
      return res.json(foundUsers);
    }
  );
};

exports.addUserRequest = async (req, res) => {
  try {
    const teacherId = res.locals.user.id;
    const studentId = req.body._id;
    const studentEmail = req.body.email;
    const foundTeacher = await User.findOne({
      _id: teacherId,
      $or: [
        { pendingStudents: { $in: [studentId] } },
        { students: { $in: [studentId] } },
      ],
    });
    if (foundTeacher) {
      return res.status(422).send({
        errors: [
          {
            title: "申請済みです",
            detail:
              "既にこの生徒に申請済みです。生徒登録されない場合は生徒が承認ボタンを押すのをお待ちください。",
          },
        ],
      });
    }
    await User.findOneAndUpdate(
      { _id: teacherId },
      { $push: { pendingStudents: studentId } }
    );
    await User.findOneAndUpdate(
      { _id: studentId },
      { $push: { pendingTeachers: teacherId } }
    );
    await sendEmailTo(studentEmail, REQUEST_RECEIVED, req.hostname);

    return res.json({ status: "success" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.acceptAddUserRequest = async (req, res) => {
  const studentId = res.locals.user.id;
  const teacherId = req.body._id;
  const teacherEmail = req.body.email;

  User.findOne(
    {
      _id: teacherId,
      students: { $in: [studentId] },
    },
    async (err, foundTeacher) => {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      if (foundTeacher) {
        return res.status(422).send({
          errors: [
            {
              title: "承認済みです",
              detail: "既にこの先生を承認済みです。",
            },
          ],
        });
      }
      try {
        await User.findOneAndUpdate(
          { _id: teacherId },
          {
            $pull: { pendingStudents: studentId },
            $push: { students: studentId },
          }
        );
        await User.findOneAndUpdate(
          { _id: studentId },
          {
            $pull: { pendingTeachers: teacherId },
            $push: { teachers: teacherId },
          }
        );

        await sendEmailTo(teacherEmail, REQUEST_ACCEPTED, req.hostname);
        return res.json({ status: "success" });
      } catch (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
    }
  );
};

exports.removeUserRequest = async (req, res) => {
  const teacherId = res.locals.user.id;
  const studentId = req.body._id;
  const studentEmail = req.body.email;

  try {
    await User.findOneAndUpdate(
      { _id: teacherId },
      { $pull: { students: studentId } }
    );
    await User.findOneAndUpdate(
      { _id: studentId },
      { $pull: { teachers: teacherId } }
    );

    const foundTeacher = await User.findById(teacherId);

    const newNotification = new Notification({
      title: foundTeacher.username + "先生が担当から外れました",
      description: foundTeacher.username + "先生が担当から外れました",
      user: studentId,
    });

    const savedNotification = await newNotification.save();

    await User.findOneAndUpdate(
      { _id: studentId },
      { $push: { notifications: savedNotification } }
    );
    sendEmailTo(studentEmail, REMOVED_RECEIVED, req.hostname, foundTeacher);
    return res.json({ status: "success" });
  } catch (err) {
    return res.status(422).send({ errors: normalizeErrors(err.errors) });
  }
};

exports.getMyStudents = function (req, res) {
  const teacherId = res.locals.user.id;
  User.findById(teacherId)
    .populate("students", "-password")
    .exec(function (err, foundTeacher) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundTeacher.students);
    });
};

exports.getUserById = function (req, res) {
  const reqUserId = req.params.id;
  const user = res.locals.user;

  User.findOne({ _id: reqUserId })
    .populate("pendingTeachers teachers bookings")
    .populate({ path: "notifications", options: { sort: { createdAt: -1 } } })
    .exec(function (err, foundUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      foundUser.password = null;
      // if (reqUserId !== user.id) {
      //   foundUser.pendingTeachers = null;
      //   foundUser.teachers = null;
      //   foundUser.notifications = null;
      // }

      return res.json(foundUser);
    });
};

//Reffering from ./routes/user.js
exports.auth = function (req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "IDとパスワードを入力してください",
        },
      ],
    });
  }

  User.findOne({ email }, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (!foundUser) {
      return res.status(422).send({
        errors: [
          { title: "Invalid user!", detail: "先にユーザー登録してください" },
        ],
      });
    }
    if (!foundUser.isVerified) {
      return res.status(422).send({
        errors: [
          {
            title: "Not active user!",
            detail: "アカウントが無効です。サポートからお問い合わせください",
          },
        ],
      });
    }

    if (foundUser.hasSamePassword(password)) {
      User.updateOne(
        { _id: foundUser.id },
        { lastLogin: Date.now() },
        () => {}
      );

      const token = jwt.sign(
        {
          userId: foundUser.id,
          username: foundUser.username,
          userRole: foundUser.userRole,
        },
        config.SECRET,
        { expiresIn: "12h" }
      ); // return JWT token

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          { title: "Invalid!", detail: "IDまたはパスワードが間違っています" },
        ],
      });
    }
  });
};

exports.register = function (req, res) {
  const {
    username,
    email,
    password,
    passwordConfirmation,
    userRole,
  } = req.body;

  if (!username) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "氏名を入力してください",
        },
      ],
    });
  }

  if (!email) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "メールアドレスを入力してください",
        },
      ],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password!",
          detail: "パスワードとパスワード確認が異なります",
        },
      ],
    });
  }

  // Filling user infomation with ../models/user.js format
  const user = new User({
    username,
    email,
    password,
    userRole,
  });

  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email!",
            detail: "このメールアドレスは既に登録されています！",
          },
        ],
      });
    }

    User.create(user, function (err, newUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(newUser);
    });
  });
};

// Not completely works!
exports.deleteUser = async function (req, res) {
  const reqUserId = req.params.id;
  const user = res.locals.user; // This is logined user infomation.

  if (user.userRole === "Owner") {
    try {
      await Booking.deleteMany({ user: reqUserId });
      await User.deleteOne({ _id: reqUserId });
      return res.json({ registered: false });
    } catch (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
  } else {
    return res.status(422).send({
      errors: {
        title: "Invalid user!",
        detail: "管理者権限がない為削除できません",
      },
    });
  }
};

exports.updateUser = function (req, res) {
  const userData = req.body;
  const { password, passwordConfirmation } = req.body;
  const reqUserId = req.params.id;
  const user = res.locals.user; // This is logined user infomation.

  // Teacher can change their students course time and lessons per month.
  if (reqUserId !== user.id) {
    User.findOneAndUpdate(
      { _id: reqUserId },
      userData,
      { returnOriginal: false },
      function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json({ status: "success" });
      }
    );
  } else {
    if (!password) {
      // Update user info without password.
      User.findOneAndUpdate(
        { _id: user.id },
        userData,
        { returnOriginal: false },
        function (err, foundUser) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          }

          const token = jwt.sign(
            {
              userId: user.id,
              username: foundUser.username,
              userRole: foundUser.userRole,
            },
            config.SECRET,
            { expiresIn: "12h" }
          );

          return res.json(token);
        }
      );
    } else {
      if (password !== passwordConfirmation) {
        return res.status(422).send({
          errors: [
            {
              title: "Error!",
              detail: "パスワードとパスワード（確認）が異なります",
            },
          ],
        });
      }

      // Update user password.
      User.findById(reqUserId, function (err, foundUser) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        foundUser.password = password;
        foundUser.save();

        const token = jwt.sign(
          {
            userId: user.id,
            username: foundUser.username,
            userRole: foundUser.userRole,
          },
          config.SECRET,
          { expiresIn: "12h" }
        );

        return res.json(token);
      });
    }
  }
};

exports.setInitialPassword = function (req, res) {
  const userId = req.params.id;
  const password = "tsubaki";

  User.findById(userId, function (err, foundUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    foundUser.password = password;
    foundUser.save(function (err) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.status(200).send(foundUser);
    });
  });
};

function parseToken(token) {
  // split token string [Bearer XXXXXXXXX] with ' ' and return XXXXXXXXX
  return jwt.verify(token.split(" ")[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: "Not authorized!",
        detail: "You need to login to get access!",
      },
    ],
  });
}

exports.authMiddleware = function (req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function (err, user) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};
