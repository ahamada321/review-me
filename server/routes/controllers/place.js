
const config = require('../../config')


exports.getPlacesFrom = function(req, res) {
    // const { username, email, msg } = req.body

    if(!username || !email) {
        return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide your name and email!"}]})
    }

    if(!msg) {
        return res.status(422).send({errors: [{title: "Data missing!", detail: "Provide your questions or requests!"}]})
    }

    return res.json({'Sent': true})
}