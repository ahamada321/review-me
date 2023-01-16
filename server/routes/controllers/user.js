const User = require("./models/user");
const Booking = require("./models/booking");
const { normalizeErrors } = require("./helpers/mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../../config");

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
        },
      },
      { $sort: { patientId: -1 } },
    ],
    function (err, foundUsers) {
      return res.json(foundUsers);
    }
  );
};

exports.getUserById = function (req, res) {
  const reqUserId = req.params.id;
  const user = res.locals.user;

  if (reqUserId == user.id) {
    // Display all
    User.findById(reqUserId, function (err, foundUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      return res.json(foundUser);
    });
  } else {
    // Restrict some data
    User.findById(reqUserId)
      // .select('-revenue -customer -password')
      .select("-password")
      .exec(function (err, foundUser) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
        return res.json(foundUser);
      });
  }
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
            detail: "事務局に講師活動再開連絡をしてください",
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
  const { username, email, password, birthday, gender } = req.body;

  // Filling user infomation with ../models/user.js format
  const user = new User({
    username,
    email,
    password,
    birthday,
    gender,
  });

  if (!email || !password) {
    return res.status(422).send({
      errors: [
        {
          title: "Data missing!",
          detail: "フォームに正しく入力してください",
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

exports.updateUser = function (req, res) {
  const userData = req.body;
  const { password, confirmPassword } = req.body;
  const reqUserId = req.params.id;
  const user = res.locals.user; // This is logined user infomation.

  if (user.userRole === "Owner") {
    User.updateOne({ _id: reqUserId }, userData, () => {});

    const token = jwt.sign(
      {
        userId: user.id,
        username: userData.username,
        userRole: user.userRole,
      },
      config.SECRET,
      { expiresIn: "12h" }
    );

    return res.json(token);
  } else if (reqUserId === user.id) {
    if (!password || !confirmPassword) {
      return res.status(422).send({
        errors: [
          {
            title: "Data missing!",
            detail: "パスワードとパスワード（確認）を入力してください",
          },
        ],
      });
    }

    if (password !== confirmPassword) {
      return res.status(422).send({
        errors: [
          {
            title: "Error!",
            detail: "パスワードとパスワード（確認）が異なります",
          },
        ],
      });
    }

    User.updateOne({ _id: reqUserId }, userData, () => {});

    const token = jwt.sign(
      {
        userId: user.id,
        username: userData.username,
        userRole: user.userRole,
      },
      config.SECRET,
      { expiresIn: "12h" }
    );

    return res.json(token);
  } else {
    return res.status(422).send({
      errors: {
        title: "Invalid user!",
        detail: "Cannot edit other user profile!",
      },
    });
  }
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

exports.setNwePassword = function (req, res) {
  const { email, password, passwordConfirmation } = req.body;
  const verifyToken = req.params.token;
  let user;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        { title: "Data missing!", detail: "Provide email and password!" },
      ],
    });
  }

  if (password != passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password!",
          detail: "Password is not as same as confirmation!",
        },
      ],
    });
  }

  if (verifyToken) {
    try {
      user = jwt.verify(verifyToken, config.SECRET);
    } catch (err) {
      return res.status(422).send({
        errors: [
          { title: "Invalid token!", detail: "Token format is invalid!" },
        ],
      });
    }
  }

  if (email !== user.email) {
    return res.status(422).send({
      errors: [
        {
          title: "email is incorrect!",
          detail: "Email is incorrect as we sent!",
        },
      ],
    });
  }

  User.findById(user.userId, function (err, foundUser) {
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
