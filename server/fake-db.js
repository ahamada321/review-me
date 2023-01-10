// const Rental = require('./routes/controllers/models/rental')
// const Booking = require('./routes/controllers/models/booking')
// const User = require('./routes/controllers/models/user')
// const Payment = require('./routes/controllers/models/payment')
// const Data = require('./template-data/db-data.json')

class FakeDb {
  // constructor() {
  //     this.rentals = Data.rentals
  //     this.users = Data.users
  // }
  // async cleanDb() {
  //     await Rental.deleteMany({})
  //     await User.deleteMany({})
  //     await Booking.deleteMany({})
  //     await Payment.deleteMany({})
  // }
  // pushDataToDb() {
  //     const user = new User(this.users[0])
  //     const user2 = new User(this.users[1])
  //     const user3 = new User(this.users[2])
  //     this.rentals.forEach((rental) => {
  //         const newRental = new Rental(rental)
  //         newRental.user = user3
  //         user.rentals.push(newRental)
  //         newRental.save()
  //     })
  //     user.save()
  //     user2.save()
  //     user3.save()
  // }
  // async seeDb() {
  //     await this.cleanDb()
  //     this.pushDataToDb()
  // }
}

module.exports = FakeDb;
