const Post = require("./routes/controllers/models/post");
const Booking = require("./routes/controllers/models/booking");
const User = require("./routes/controllers/models/user");
const Payment = require("./routes/controllers/models/payment");
const Notification = require("./routes/controllers/models/notification");
const Data = require("./template-data/db-data.json");

class FakeDb {
  constructor() {
    this.posts = Data.posts;
    this.users = Data.users;
  }
  async cleanDb() {
    await Post.deleteMany({});
    await User.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await Notification.deleteMany({});
  }
  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);
    const user3 = new User(this.users[2]);
    this.posts.forEach((post) => {
      const newPost = new Post(post);
      newPost.user = user3;
      user.posts.push(newPost);
      newPost.save();
    });
    user.save();
    user2.save();
    user3.save();
  }
  async seeDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
