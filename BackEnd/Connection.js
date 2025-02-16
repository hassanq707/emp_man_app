const mongoose = require("mongoose")

const connectToMongo = (URL) => {
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectToMongo