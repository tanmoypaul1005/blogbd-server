const { default: mongoose } = require("mongoose")
require('dotenv').config();
module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nswkl.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)

        console.log("Database Connect");
    } catch (error) {
        console.log(error)
    }

}