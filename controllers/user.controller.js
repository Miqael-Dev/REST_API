const userModel = require("../model/user.model.js")

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
	    const user = await userModel.findById(id)
	    res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addUser = async (req, res) => {
    try{
		const product = await userModel.create(req.body)
		res.status(200).json(product)
	} catch(error) {
		res.status(500).json({message : error.message})
	}
}

const updateUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
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
}


module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}