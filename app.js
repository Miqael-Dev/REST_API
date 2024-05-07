const express = require("express")
const mongoose = require("mongoose")
const userModel = require("./model/user.model.js")
const userRoute = require("./routes/user.route.js")

const app = express()
const PORT = 3002

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use("/users", userRoute)


app.get("/", (req, res) => {
	res.send("Hello World")
})

mongoose.connect("mongodb://localhost:27017/test")
.then(()=> {
	app.listen(PORT,() => {
		console.log("you are connected to port 3002")
	})
	console.log("connected")
})
.catch(() => {
	console.log("couldn't connect")
})
