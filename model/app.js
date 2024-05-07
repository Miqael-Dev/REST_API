const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 3002

app.use(express.json())
app.use(express.urlencoded({ extended : false}))

app.get("/", (req, res) => {
	res.send("Hello World")
})

const users = new mongoose.Schema({
	name: String,
	age: Number,
})

const userModel = mongoose.model("users", users)

app.post("/users", async (req, res) => {
	try{
		const product = await userModel.create(req.body)
		res.status(200).json(product)
	} catch(error) {
		res.status(500).json({message : error.message})
	}
})

app.get("/users/:id", async (req, res) => {
	const { id } = req.params;
	const user = await userModel.findById(id)
	res.status(200).json(user)
})

app.get("/users", async (req, res) => {
	const users = await userModel.find({})
	res.status(200).json(users)
})

app.put("/users/:id", async (req, res) => {
	try {
		const { id } = req.params
		const userUpdate = await userModel.findByIdAndUpdate(id, req.body)
		const updatedUser = await userModel.findById(id)
		if(!userUpdate){
			return res.status(404).json({message: "User not found"})
		}
		res.status(200).json(updatedUser)

	} catch (error) {
		res.status(500).json({ message : error.message})
	}
})

app.delete("/users/:id", async (req, res) => {
	try{
		const { id } = req.params;
		const deleteUser = await userModel.findByIdAndDelete(id)

		if(!deleteUser){
			return res.status(404).json({message : "user not found"})
		}

		res.status(200).json({message: "User deleted successfully"})

	} catch(error) {
		res.status(500).json({message: error.message})
	}

})

mongoose.connect("mongodb://localhost:27017/test")
.then(()=> {
	app.listen(PORT,() => {
		console.log("you are connected to port 3000")
	})
	console.log("connected")
})
.catch(() => {
	console.log("couldn't connect")
})
