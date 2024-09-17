const mongoose = require("mongoose");
const { boolean } = require("zod");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: { type: Date, default: Date.now },
    completed: {
        type: Boolean , default:false
    }
})

const Todo = mongoose.model("Todo-App", TodoSchema);

module.exports = Todo;