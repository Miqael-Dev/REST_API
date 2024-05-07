const mongoose  = require("mongoose");


const users = new mongoose.Schema({
	name: String,
	age: Number,
})

const userModel = mongoose.model("users", users)

module.exports = userModel;