// const mongoose = require("mongoose");

import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

// module.exports = mongoose.model("todo",todoSchema);
export const todoModel = mongoose.model("todos", todoSchema); // same as above line