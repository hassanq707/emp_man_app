const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    category: { type: String, default: "General" }
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "employee"
    },

    userTasks: {
        newTask: {
            tasks: [taskSchema]
        },
        completed: {
            tasks: [taskSchema]
        },
        failed: {
            tasks: [taskSchema]
        },
    },
})

const USER = mongoose.model("users", userSchema)

module.exports = USER