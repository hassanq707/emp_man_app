const express = require("express")
const { handleSignup, handleLogin } = require("../controllers/user")
const { handleCreateTask ,handleUpdateTask } = require("../controllers/task")
const router = express.Router()

router.post("/signup",handleSignup)

router.post("/login",handleLogin)

router.post("/createTask",handleCreateTask)

router.post("/updateTask",handleUpdateTask)

module.exports = router
