const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model.js")
const { getUsers, getUser, addUser, updateUser, deleteUser } = require("../controllers/user.controller.js")

router.get("/" , getUsers);
router.get("/:id" , getUser);
router.post("/" , addUser);
router.put("/:id" , updateUser);
router.delete("/:id" , deleteUser);

module.exports = router;